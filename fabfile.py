#!/usr/bin/python
# -*-coding: utf8-*-

import time

from fabric.api import env, task, cd, run, local

# configuration
env.roledefs = {
    'production': ['bamboo']
}
env.use_ssh_config = True


@task
def upload():
    current_branch = local('git rev-parse --abbrev-ref HEAD', capture=True)
    local('git push origin %s' % current_branch)

    with cd('/data/apps/bamboo-api'):
        run('git fetch')
        run('git reset --hard HEAD')
        run('git checkout origin/%s' % current_branch)
        run('npm install')
        if env.host_string in env.roledefs['production']:
            run('ln -sf /data/apps/bamboo-api/config/production.json /data/apps/bamboo-api/config.json')
        else:
            run('ln -sf /data/apps/bamboo-api/config/dev.json /data/apps/bamboo-api/config.json')

@task
def restart():
    run('supervisorctl update')
    run('supervisorctl restart bamboo_backend')
    time.sleep(3)
    run('supervisorctl status bamboo_backend')


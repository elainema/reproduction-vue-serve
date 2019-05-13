#!/bin/bash
export PATH=/sbin:/usr/sbin:/usr/local/sbin:/usr/local/bin:/usr/bin:/bin
set -xv

/bin/bash /dianyi/app/ypp/scm_deploy.sh /root/ym-web-newmanage.tar.gz

# init log file
/bin/bash /root/ypp_log_init.sh

sed -i "s/api[^_]*.dy/${NEW_API_ADDR}/" /dianyi/app/yfp/newmanage/static/script/main*.js
sed -i "s/api[^_]*.com/${NEW_API_ADDR}/" /dianyi/app/yfp/newmanage/static/script/main*.js
sed -i "s/api[^_]*.com/${NEW_API_ADDR}/" /dianyi/app/yfp/newmanage/js/app.*.js
sed -i "s/api[^_]*.dy/${NEW_API_ADDR}/" /dianyi/app/yfp/newmanage/js/app.*.js
sed -i 's/vincent/newymapi/'   /dianyi/app/yfp/newmanage/static/script/main*.js

# start services and as a daemon
/bin/bash /dianyi/app/ypp/web.sh start &
/usr/sbin/sshd -D

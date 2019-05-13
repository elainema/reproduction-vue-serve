FROM xa.repo.ndp.com:5000/yeahmobi_snapshots/web_base:0.3

ENV BUILD_DIR gears

COPY $BUILD_DIR/manage.ym.dy  /dianyi/app/ypp/webserver/conf/conf.d/
COPY $BUILD_DIR/ym-web-newmanage.tar.gz $BUILD_DIR/ypp_log_init.sh /root/

ADD $BUILD_DIR/paas-bootstrap.sh /
CMD bash /paas-bootstrap.sh

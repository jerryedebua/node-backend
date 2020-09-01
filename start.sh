# Have redis installed

REDIS_PATH=$1

gnome-terminal \
\
--window -e "bash -c \" $REDIS_PATH/src/redis-server; bash \"" \
\
--window -e "bash -c \" npm run dev; bash \""
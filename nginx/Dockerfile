FROM nginx:alpine

COPY nginx.conf.template /etc/nginx/nginx.conf.template

EXPOSE 80

RUN echo "NGROK PUBLIC URL: $REACT_APP_NGROK_PUBLIC_URL"

# RUN chmod +x entrypoint.sh
# COPY entrypoint.sh /entrypoint.sh

# ENTRYPOINT ["/entrypoint.sh"]

# CMD /bin/sh -c 'export REACT_APP_NGROK_PUBLIC_URL=$(echo $REACT_APP_NGROK_PUBLIC_URL | sed 's|https://||') && envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g "daemon off;"'

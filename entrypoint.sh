#!/bin/sh
chmod +x entrypoint.sh
npx prisma db push
exec npm run start:prod

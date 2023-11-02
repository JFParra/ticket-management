# Utilizing NextJS | Prisma | NextAuth | Credentials | ChakraUI | Postgres

## Introduction

NextJS app using:

- [Prisma](https://www.prisma.io/)
- [Chakra-UI](https://chakra-ui.com/)
- [NextAuthJS](https://next-auth.js.org/)
  - [Credentials (Email & Password)](https://next-auth.js.org/providers/credentials)
- [ChakraUI](https://chakra-ui.com/)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

Note that the app uses a mix of server-side rendering with `getServerSideProps` (SSR) and static site generation with `getStaticProps` (SSG). When possible, SSG is used to make database queries already at build-time (e.g. when fetching the [Ticket feed](./src/pages/index.tsx)).

# DB Configuration

Push DB schemas

```
nvm use 18
```

```
npx prisma db push
```


# Install & run

node version

```
nvm use 18
```

install

```
git clone https://github.com/JFParra/ticket-management.git
yarn install
```

copy environment and fill in with your data

```
cp .env
```

run

```
yarn dev
```

build / prisma generate

```
yarn build
```
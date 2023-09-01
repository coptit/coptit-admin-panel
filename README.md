# COPTIT Admin Panel

A Full Stack TypeScript Application for Sending Admin message to Coptit Discord Server and
Sending Bulk / Transactional email for club members.

## Authors

- [Kunal Singh](https://github.com/kunalsin9h)

### Stack

#### Frontend (client)

- React + Vite
- Tailwind Css
- TypeScript (tsx)

#### Backend (server)

- TypeScript
- [Express.JS](https://expressjs.com/)
- [tRPC](https://trpc.io)
- [zod](https://zod.dev/)
- [nodemailer](https://nodemailer.com/)

![image](https://tiddi.kunalsin9h.com/eTBJPkO)

### Local Setup

Clone the repository

```bash
git clone https://github.com/coptit/coptit-admin-panel.git
```

cd to repository

```bash
cd coptit-admin-panel
```

Download Dependencies

```bash
npm install
```

#### Server Require some Environment Variables, this can be provided with `.env` file

Copy the `.env-template` file into `.env` file

```bash
cd server
cp .env-template .env
```

Fill the `.env` file

| Property      | Require | Description                  |
| ------------- | ------- | ---------------------------- |
| ADMIN_USER    | yes     | The user email of the Admin  |
| ADMIN_PASS    | yes     | The Password of the admin    |
| SMTP_USERNAME | no      | SMTP username                |
| SMTP_USER     | no      | SMTP user (email@domain.com) |
| SMTP_PASS     | no      | SMTP password                |
| BOT_TOKEN     | no      | Discord Bot token            |
| GUILD_ID      | no      | Discord Channel ID           |

Run Dev server

```bash
npm run dev
```

Build the project

```bash
npm run build
```

Start the Production Server

```bash
npm start
```

This will start both `client` and `server`

`client` will be served at `http://localhost:4000`

`server`

- `tRPC` server will be serve at `http://localhost:4001`
- `Express` server will be serve at `http://localhost:4002`

# API Docs

### Sending Transactional Emails

```Ocaml
POST http://localhost:4002/api/sendmail
```

Request Body

```json
{
  "to": "string",
  "subject": "string",
  "text": "string",
  "html": "string"
}
```

Response Body

```json
{
  "messageid": "string"
}
```

# License

[MIT](https://choosealicense.com/licenses/mit/)

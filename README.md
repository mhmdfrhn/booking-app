# MERN STACK Mini Project Booking App

#### Description:

Booking app mini project adalah sebuah aplikasi yang mengimplementasikan dasar dasar dari sebuah sistem pemesanan online, dalam kasus ini adalah sebuah **Hotel**.

#### Tech Stack:

- Mongodb
- Express
- ReactJS
- NodeJS

#### Requirements:

- Mongodb v@2.2.12
- React >= 18.0
- Express v^4.18.2
- Mongoose v^7.2.2

#### Instalation

```
### Clone repositori ini:
git clone https://github.com/mhmdfrhn/booking-app.git

### Masuk ke direktori proyek:
cd booking-app/client / cd booking-app/api

### Install dependensi menggunakan yarn atau npm:
yarn install
npm install

### Masuk ke direktori proyek api:
cd booking-app/api

### Salin file .env.example menjadi .env:
cp .env.example .env

### Konfigurasi file .env sesuai dengan pengaturan database key Anda:
MONGO_URI=
JWT=
// untuk mendapatkan token JWT bisa menggunakan command: `openssl rand -base64 32`

### Menjalankan server client dan api
cd client && yarn dev
cd api && yarn dev

### Buka aplikasi di browser dengan mengakses:
http://localhost:5137/.
```

#### Notes:

pastikan model database yang tersedia sudah di import kedalam cluster mongodb database yang sudah anda buat sebelumnya.

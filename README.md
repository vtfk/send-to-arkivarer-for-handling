# send-to-arkivarer-for-handling
Easy tool for sending documents to manual archiving queue

## Install
```bash
git clone https://github.com/vtfk/send-to-arkivarer-for-handling.git
```
Naviger inn i det klonede prosjektet i en terminal, og kjør
```bash
npm i
```

## Configure
Setup your *.env* file
```bash
P360_URL="https://<server>:<port>.no/Biz/v2/api/call/SI.Data.RPC/SI.Data.RPC"
P360_KEY="secret-authkey"
INPUT_FOLDER=C:/toUnreg
#Optional
P360_ORIGIN_RECNO="recno til origin fra p360 kodetabell"
DEFAULT_MSG="En beskjed til arkivarer - som vil følge dokumentet"
```

## Usage
- Flytt filer du vil sende til uregistrerte (manuell arkivering) inn i \<INPUT FOLDER>
- Kjør
```bash
node index.js
```
- Importerte filer havner i \<INPUT FOLDER>/imported
- Feilede filer havner i \<INPUT FOLDER>/error
- Scriptet sier i fra om noe gikk dritt
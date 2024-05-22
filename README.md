# ChatterBox

Design Document: https://docs.google.com/document/d/1BRMRRii3Edt42wU9_Xz48_6is0S0kZUt069RupbArec/edit?usp=sharing

A chatroom where users can interact with the room through text messages. It supports the censoring of toxic words. The following category of messages is censored by the toxicity model integrated into the chat app, identity attacks, insults, obscene, severe toxicity, sexually explicit, and threats. It also provides functions such as writing a new message by speaking (speech to text) and auto-reading of new messages (text to speech).

### Installation instructions:
Enable speech to text api on google cloud console, then create a service account and download its json file.
The file should be placed inside the api folder.

##### Clone this repository locally.
```
git clone https://github.com/ashutoshc8101/chatroom.git
```

#### Install dependencies
```
cd api;
npm install
mv .env.example .env
cd ../app
npm install
```

Update the mongodb username and password in the `.env` file.

To run the web app locally, use the following commands:
```
cd api;
npm run start;
cd ../app;
npm run start;
```

### Live Demo
A demo is deployed on http://13.235.177.229/. The speech to text functionality is not working in the demo as it requires a https connection.

### Demo Video

https://user-images.githubusercontent.com/24855641/199422676-9f21349d-2a67-4198-bfa3-c905d4a4476c.mp4


## Speech Recognition

Enable speech recogition on [Google Cloud Console](https://cloud.google.com/speech-to-text) and create a service account.
Download serviceAccount.json and place it in api folder.


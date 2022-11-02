# Smart Chat

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

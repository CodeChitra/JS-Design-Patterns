class Subscriber {
  constructor(name) {
    this.name = name;
  }
  update(channelName, videoTitle) {
    console.log(
      `Notification to ${this.name}: ${channelName} uploaded a new video: ${videoTitle}`
    );
  }
}

class YouTubeSubscriber extends Subscriber {
  constructor(name) {
    super(name);
  }
}

class YouTubeChannel {
  constructor(channelName) {
    this.channelName = channelName;
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    const index = this.subscribers.indexOf(subscriber);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  notifySubscriber(videoTitle) {
    for (const subscriber of this.subscribers) {
      subscriber.update(this.channelName, videoTitle);
    }
  }

  uploadVideo(videoTitle) {
    console.log(`${this.channelName} uploaded: ${videoTitle}`);
    this.notifySubscriber(videoTitle);
  }
}

// Client Code
const channel = new YouTubeChannel("TechWorld");
const user1 = new YouTubeSubscriber("User1");
const user2 = new YouTubeSubscriber("User2");

channel.subscribe(user1);
channel.subscribe(user2);

channel.uploadVideo("Observer Pattern Explained"); // Notify all subscribers

channel.unsubscribe(user1);

channel.uploadVideo("Strategy Pattern in Depth");

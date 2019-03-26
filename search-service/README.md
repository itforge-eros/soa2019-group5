# Search Service

## Preriquisite

1. Install sbt

`brew install sbt`

2. Install elastic search from https://www.elastic.co

## Test

`sbt test`

## Build

Build to JAR

`sbt assembly`

## Run

`sbt run`

## Endpoints

### Search memos

`GET /search/:keyword?tags=:tag&limit=:limit&offset:offset`

request: `GET /search/python?tags=programming`

response:

```json
[
   {
      "title":"CNN with Python",
      "content":"Computer Vision has become ubiquitous in our society, with applications in search, image understanding, apps, mapping, medicine, drones, and self-driving cars. Core to many of these applications are visual recognition tasks such as image classification, localization and detection. Recent developments in neural network (aka “deep learning”) approaches have greatly advanced the performance of these state-of-the-art visual recognition systems. This course is a deep dive into details of the deep learning architectures with a focus on learning end-to-end models for these tasks, particularly image classification. During the 10-week course, students will learn to implement, train and debug their own neural networks and gain a detailed understanding of cutting-edge research in computer vision. The final assignment will involve training a multi-million parameter convolutional neural network and applying it on the largest image classification dataset (ImageNet). We will focus on teaching how to set up the problem of image recognition, the learning algorithms (e.g. backpropagation), practical engineering tricks for training and fine-tuning the networks and guide the students through hands-on assignments and a final course project. Much of the background and materials of this course will be drawn from the ImageNet Challenge.",
      "summary":"This course is a deep dive into details of the deep learning architectures with a focus on learning end-to-end models for these tasks, particularly image classification. During the 10-week course, students will learn to implement, train and debug their own neural networks and gain a detailed understanding of cutting-edge research in computer vision.",
      "tags":[
         "science",
         "programming"
      ],
      "created_time":"2019-02-12T08:22:06.286Z",
      "updated_time":"2019-02-12T08:22:06.286Z"
   }
]
```

### List all memos (For testing)

`GET /all`

response:

```json
[
   {
      "title":"CNN with Python",
      "content":"Computer Vision has become ubiquitous in our society, with applications in search, image understanding, apps, mapping, medicine, drones, and self-driving cars. Core to many of these applications are visual recognition tasks such as image classification, localization and detection. Recent developments in neural network (aka “deep learning”) approaches have greatly advanced the performance of these state-of-the-art visual recognition systems. This course is a deep dive into details of the deep learning architectures with a focus on learning end-to-end models for these tasks, particularly image classification. During the 10-week course, students will learn to implement, train and debug their own neural networks and gain a detailed understanding of cutting-edge research in computer vision. The final assignment will involve training a multi-million parameter convolutional neural network and applying it on the largest image classification dataset (ImageNet). We will focus on teaching how to set up the problem of image recognition, the learning algorithms (e.g. backpropagation), practical engineering tricks for training and fine-tuning the networks and guide the students through hands-on assignments and a final course project. Much of the background and materials of this course will be drawn from the ImageNet Challenge.",
      "summary":"This course is a deep dive into details of the deep learning architectures with a focus on learning end-to-end models for these tasks, particularly image classification. During the 10-week course, students will learn to implement, train and debug their own neural networks and gain a detailed understanding of cutting-edge research in computer vision.",
      "tags":[
         "science",
         "programming"
      ],
      "created_time":"2019-02-12T08:22:06.286Z",
      "updated_time":"2019-02-12T08:22:06.286Z"
   },
   {
      "title":"Markdown for dummy",
      "content":"Markdown is a lightweight markup language with plain text formatting syntax. Its design allows it to be converted to many output formats, but the original tool by the same name only supports HTML.[8] Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor. Since the initial description of Markdown contained ambiguities and unanswered questions, the implementations that appeared over the years have subtle differences and many come with syntax extensions.",
      "summary":"Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.",
      "tags":[
         "github pages",
         "markdown"
      ],
      "created_time":"2019-02-12T08:22:06.286Z",
      "updated_time":"2019-02-12T08:22:06.286Z"
   }
]
```

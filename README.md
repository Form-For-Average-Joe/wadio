<p align="center">
<img width="250" src="src/assets/OrbitalLogo.png">
</p>

<div align="center">

# Form For the Average Joe

**National University of Singapore**  
Orbital 2022 - Form For Average Joe  
Koh Chee Heng | Gujar Parth Shailesh  
</div>

## Deployment
>https://form-for-average-joe.web.app/
  
## Features
Below are the features that have been implemented for Milestone 1:

***Signup and Login System***  
Currently, we have a system where unregistered users can perform the exercises and gain feedback, but in order to save the session statistics, they need to be logged in. Currently, we have three authentication methods: Google, GitHub, and the standard email and password procedure. The app will request you to sign in if it detects that you are attempting to access pages that require data from signed-in users. The app also persists your authentication credentials, so that you do not have to keep signing in after closing the browser session.

***Push-ups and Sit-ups rep counting***  
The web-app is able to detect the pose of the user and decide if one rep of that particular exercise has been completed. This is done so by first recognising the starting position. In the case of push-ups, the starting pose is the standard push-up position with arms straightened. Next, it waits for the user to move to the reverse-point position. This refers to when the user attempts to do a push-up and has bent his/her arm to the required depth. The rep is registered when the user returns back to the starting position.

***Push-ups and Sit-ups form checker***  
While counting reps, the web-app also has another algorithm to check if, at any point during the rep, the user is not maintaining proper exercise posture. Improper posture for each exercise is unique. For push-ups, it refers to a curved back, unstraightened arms or not going low enough. Everytime improper posture is detected, the corresponding rep will not be counted. Difficulty levels can be set by manipulating the threshold values. For instance, how curved can the back be before it is considered improper form.

***Customisable Time and Exercise Difficulty***  
The web-app allows users to change difficulty levels (stringency) and to set the duration of the exercise. Somebody doing the standard IPPT would set the time to 1 minute while somebody only doing training might set it to 30 seconds. The exercise will cut (stop counting reps) when the timer reaches zero.

***Responsive UI***  
All the components of the UI have been responsive to devices of different sizes, including the home page, leaderboard, and dashboard. Making a responsive UI was part of our plan to cater to users’ convenience, so that they will not face issues when connecting from either their phone or their laptop. We also have implemented a screen orientation detection feature, to remind users to orient the screen when exercising, for the webcam to capture the entire body.

***User Data***  
Upon creating an account in the app, users will be prompted to input their data, including their preferred nickname, age, gender, weight, height, and whether or not they prefer their account to stay anonymous on the global leaderboard. Information such as weight and height can be used to compute useful information such as their BMI. Weight and other user data can also be passed into an algorithm to find accurate estimates of calories burnt after each exercise.

***Calories Burnt***  
Currently, our app is able to estimate the calories burnt after each exercise session based on various metrics fed into a custom algorithm. Scientifically, gender, age, reps, rate of reps, and weight can affect the actual calories burnt. As such, it would be naive to assume a constant value simply based on the number of reps performed and ignore other factors entirely. The algorithm takes into account the additional data provided by the user when the account is created (or latest modified in the settings menu) and generates an estimate for calories burnt. It can then be added to the cumulative calories burnt for the particular user.

***Leaderboard***  
Leaderboards have been added to the app, featuring the global and private leaderboard. For the global leaderboard, users are able to find out their global ranking in terms of cumulative reps for each exercise. Their nickname will be shown on the global leaderboard (anonymous if the user sets his/her profile to anonymous in the settings). Each user also has the ability to create private leaderboards, each of which is defined by a unique leaderboard code. This code can be given to friends and family members for them to join a private leaderboard. Anonymous users will be given random names on the global leaderboard, and access to their statistics will be disabled.

***Progress Bar***  
A user progress bar has been added to the user profile dashboard. There are a total of 6 levels the user can attain, depending on his/her cumulative calories burnt, from Rookie to Legend. Each new level will require 1000 calories (to be changed later to make it progressively more difficult to level up), with Legendary requiring 5000 calories. The user level is used as a way for users to unlock new exercises.

***Exercise History***  
User exercise history has also been added to the profile dashboard. Useful information such as the type of exercise, reps and calories burnt is reflected to the user for his/her reference or self-tracking. As long as the user is not set to anonymous, his/her exercise history can also be viewed by others accessing from the global leaderboard. Of course, private information like height and weight are omitted when viewing foreign profiles.
  
## Tech Stack
1. **Frontend (state management)** - ReactJS (Redux)
2. **Backend services** - Firebase
3. **Pose detection** - TensorflowJS
4. **Cloud Services for Redis and virtual server** - Amazon Web Services MemoryDB and EC2
5. **Leaderboard microservice** - Node.JS
  
## Challenges
**Milestone 1**
  
*Frontend design* - As neither of us has had extensive experience with HTML/CSS before, we found it difficult to achieve the styling we wanted, as our styling approach sometimes led to bugs.
  
*Selection of the pose detection model* - Initially we were using a different model called OpenPose. OpenPose was rather unsuited for our use-case, as it relied on GPUs to ensure its accuracy.
  
*Pose detection accuracy* - While the MoveNet model is able to accurately track the key points of a human body, it was difficult to design a robust algorithm that prevents users from cheating. As present, we are using assumptions on the relative positions of body parts to determine the user’s movements. However, this can be unreliable as there exists corner cases in which the user is in an incorrect position but the algorithm does not detect it.
  
**Milestone 2**
  
*Leaderboard Database* - Initially, we wrote code to save the leaderboard data on Firestore, and to run an algorithm accumulating all the latest statistics on an hourly basis as a microservice. This did not work out for a couple of reasons - Firebase does not enable cloud functions in the free plan unless you add a credit card to your account (and we mistrust the idea of paying for Orbital and paying Google), the expensive nature of querying Firestore on such a repeated basis as our app scales to more users, the inflexible nature of the NoSQL Firestore database, and issues with concurrent reads and writes if we ran the leaderboard code more frequently.
  
*Responsive UI* - Initially, our app was only suited to the desktop view, as we began development during Milestone 1 with only a desktop view. After reading Milestone 1’s peer evaluation, we realised this error, as users would rather use our web app on their phones than their laptops. Thus, we had to redesign some of our pages to fit the mobile layout, which is taller than it is wider, as opposed to the desktop layout which is wider than it is taller. This forced us to rethink our UI, and adopt a mobile-first approach to development. We designed the subsequent pages first for the mobile, and then scaled it up to the desktop. This was rather difficult at first, as we resorted to hacky ways to achieve the desired UI for the different breakpoints. However, we slowly migrated to the paradigmatic ways of doing it.
  
## Milestone Video
[![Push-Up Demo](https://i9.ytimg.com/vi/xYssP0ImRxo/mq1.jpg?sqp=COSTh5YG&rs=AOn4CLA7g5GrCDVy5yyVDVzwlU0GbxTKaw)](https://youtu.be/xYssP0ImRxo)
  
## Set-up to run locally
```
$ npm install --global yarn # You will need yarn v1.

$ yarn # Install dependencies

$ yarn start # Lauch the frontend

$ yarn firebase emulators:start # Run this in a separate terminal, to launch the Firebase backend 
```
  
## Donations

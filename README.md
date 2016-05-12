![Pakt Views]
(https://lh3.googleusercontent.com/uE4svkftUmJQ2OfYyTeVpk7haKAbyYZDqZOR9YHpw-4x016WLmDpUXI2SA2f4frFrMq3k40OBCT0IufMlYHc4g8RKXTQ1rRSKFmfPQKUsWWawI7P_G1jhMgoWhempqQ_VioYJCikSNIJoOEAWjrMAU74dIPOSAxMBaKQR6sBRvrxmO2DQwCYJFuWXmi8r47tiHcCkILXCwKDf_6s_OZELfvTtyI2L_50lkplCRQ4DOXrHBcpKSR6HaY2IZ1LD7Jnxlwc8Aow_JiCXkFlKAWI_a3k9wAfykNHcczRUR9mo1jny1xGWMPYeOeztbAXEFSY5Tmxp3wB5b87KwV-QGAei-2KRkG9bzW-1W2t8o2FH8YeWcDkCJN4CXGzsL7CJSY5j-HydnNiMkA0CHia6QHp4SpAkwTVarw_OsfdMmd80jfUAi8WQFzLqGTrBaOShT0E3pXvxedANorAHfIeGwBnNvRowgTYWGfIQ1l6J0Fa1fWKKKW9UsqFar63ed8EF9XtD6N3l2SJajCp40dFVw2QR8sWE_22FcoPjRbUYr9yhiE0aEs4pNPr63OezmM_LrDYCA--bF1GDg0NKVt8xOkQ5YxnPSYBAZ8=w2560-h1128-no)

## Table of Contents

1. [Pakt Server](#pakt-server)
1. [Team](#team)
1. [Development](#development)
1. [Requirements](#requirements)
    1. [Installing Dependencies](#installing-dependencies)
    1. [File Hierarchy](#file-hierarchy)
1. [Contributing](#contributing)
1. [Documentation](#documentation)
1. [Running React Native Emulator](#running-react-native-emulator)

## Pakt Server

You can find the corresponding Server [here](https://github.com/marvelousSarsaparilla/paktServer.git).

## Team

  - __Product Owner__: Taylor Chamberlain
  - __Scrum Master__: Vincent Pham
  - __Development Team Members__: Deniz Mekik, Robert Boggs, Taylor Chamberlain, Vincent Pham

## Development

### Installing Dependencies

From within the root directory:
```sh
npm install
```

## Requirements

  - Xcode

### File Hierarchy

```js
ROOT
 |__PAKT__
     |
     |__ANDROID__
     |   |- ... etc ...
     |
     |__APP__
     |   |__ACTIONS__
     |   |   |- index.js
     |   |
     |   |__ASSETS__
     |   |   |__IMG__
     |   |       |- ... etc ...
     |   |
     |   |__COMPONENTS__
     |   |   |- App.js
     |   |   |- Camera.js
     |   |   |- CreatePaktDateForm.js
     |   |   |- CreatePaktForm.js
     |   |   |- CreatePaktFriendsForm.js
     |   |   |- FriendsRow.js
     |   |   |- Header.js
     |   |   |- IndividualPakt.js
     |   |   |- Landing.js
     |   |   |- Loading.js
     |   |   |- Login.js
     |   |   |- PaktList.js
     |   |   |- PaktListItem.js
     |   |   |- ProgressPics.js
     |   |
     |   |__CONTAINERS__
     |   |   |- CreatePakt.js
     |   |   |- GetCurrentPakt.js
     |   |   |- GetPakts.js
     |   |   |- LoginUser.js
     |   |   |- SendPicture.js
     |   |   
     |   |__REDUCERS__
     |   |   |- index.js
     |   |   |- pakts.js
     |   |   |- users.js
     |   |   
     |   |__TEST__
     |   |   |- ... etc ...
     |   |
     |   |__UTILS__
     |   |   |- env.example.js
     |   |   |- s3_policy.js
     |   |
     |   |- index.js
     |
     |__IOS__
         |- ... etc ...
```

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

##Documentation
[Google Doc](https://docs.google.com/document/d/1dVcplVjLmCKfeFGQ8nND-BS1UNxMItkWBqRBZwvbvWs/edit?usp=sharing)

##Running React Native Emulator
To run your app on iOS:
  ```sh
  cd /paktClient/Pakt
  react-native run-ios
  ```
  OR
  * Open /paktClient/Pakt/ios/Pakt.xcodeproj in Xcode
  * Hit the Run button
  

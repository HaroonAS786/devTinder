# DevTinder APIs

## authRouter

-   Post /register
-   Post /login
-   Post /logout

## profileRouter

-   Get /profile/view
-   Patch /profile/edit
-   Patch /profile/password

## connectionRequestRouter

-   Post /request/send/interested/:userId
-   Post /request/send/ignore/:userId
-   Post /request/review/accepted/:requestId
-   Post /request/review/rejected/:requestId

## userRouter

-   Get /user/connection
-   Get /user/received
-   Get /user/feed => Gets you the profiles if other users on platform

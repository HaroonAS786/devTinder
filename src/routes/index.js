// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

// const getUser=(id,callback)=>{
//     setTimeout(()=>{
//         console.log("Fetching user from Database......")
//         callback({userId:id,name:"Haroon Asif"})
//     },2000)
// }

// const getRepositories=(name,callback)=>{
//     console.log("Fetching Repos from Database......")
//     setTimeout(()=>{
//         callback(['Repo1','Repo2','Repo3','Repo4'])
//     },2000)
// }

// const getCommits=(repos,callback)=>{
//     console.log("Fetching commits from Database......")
//     setTimeout(()=>{
//         callback(repos)
//     },2000)
// }

// const getUser = (id) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Fetching user from Database......")
//             resolve({ userId: id, name: "Haroon Asif" })
//         }, 2000)
//     })
// }

// const getRepositories = (name) => {
//     return new Promise((resolve, reject) => {
//         console.log("Fetching Repos from Database......")
//         setTimeout(() => {
//             resolve(['Repo1', 'Repo2', 'Repo3', 'Repo4'])
//         }, 2000)
//     })
// }

// const getCommits = (repos) => {
//     return new Promise((resolve, reject) => {
//         console.log("Fetching commits from Database......")
//         setTimeout(() => {
//             // resolve(repos)
//             reject(new Error("Something went wrong"))
//         }, 2000)
//     })
// }

// const showCommits = (commits) => {
//     console.log(commits)
// }

// const showRepositories = (repo) => {
//     getCommits(repo, showCommits)
// }

// const showUser = (user) => {
//     getRepositories(user.name, showRepositories)
// }

// const displayUserCommits = async () => {
//     try {
//         const user = await getUser(1)
//         const repo = await getRepositories(user.name)
//         const commits = await getCommits(repo)
//         console.log(commits)
//     } catch (error) {
//         console.log("Error:", error.message)
//     }
// }

// displayUserCommits()
// console.log("Start");

// getUser(1)
//     .then((user)=>getRepositories(user.name))
//     .then((repo)=>getCommits(repo))
//     .then((commits)=>console.log(commits))
//     .catch((error)=>console.log(error.message))

// console.log("End");


// const p1= new Promise((res,rej)=>{
//     setTimeout(()=>{
//         res(1)
//     },2000)
// })
// const p2= new Promise((res,rej)=>{
//     setTimeout(()=>{
//         rej(new Error("error...."))
//     },2000)
// })

// Promise.race([p1,p2]).then((result)=>{
//     console.log('result', JSON.stringify(result, null, 2))
// }).catch((error)=>{
//     console.log('error', JSON.stringify(error.message, null, 2))
// })

// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//         getTopMovies((movies) => {
//             console.log('Top movies: ', movies);
//             sendEmail(customer.email, movies, () => {
//                 console.log('Email sent...')
//             });
//         });
//     }
// });

function getCustomer(id) {
    return new Promise((res, rej) => {
        console.log('Fetching Customer...')
        setTimeout(() => {
            console.log({
                id: 1,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email'
            })
            res({
                id: 1,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email'
            })
        }, 4000);
    })
}

function getTopMovies() {
    return new Promise((res, rej) => {
        console.log('Fetching Movies...')
        setTimeout(() => {
            console.log(['movie1', 'movie2'])
            res(['movie1', 'movie2']);
        }, 4000);
    })
}

function sendEmail(email, movies) {
    return new Promise((res, rej) => {
        console.log('Email sending...')
        setTimeout(() => {
            res('Email has been sent....')
        }, 4000);
    })
}


const displayCustomerData=async()=>{
    const customer=await getCustomer(1)
    if(customer.isGold){
        const topMovies=await getTopMovies()
        const emailSent=await sendEmail(customer.email,topMovies)
        console.log(emailSent)
    }
}

displayCustomerData()
## Curiosity Report on Containers


# What I thought before report

Containers were a way to quickly spin up web applications for temporary usage.

# Class notes and learning

Containers are isolated from the operating system, once hosted container "images" can be made. When changes are made to the container image the whole container and all its files are not reuploaded only the changes are stored, Thus minimizing storage.

Containers are actually used for deployment and are not just a temporary method to test applications.

Because containers are mostly seperated from their OS, the ability for applications to be executed on different OS is possible and more effiencent than the use of virtual machines.

# What I learned from my deep dive

Docker popularized containerization but there were multiple container tools that came before it. Examples LXC, Jails, BSD. 

Containers are great for microservices. This is because a developer can build and deploy multiple proccesses that are isloated but all are needed for a application. So if one thing were to have issues or stop working. The issue would be as isloated as possible, turning a large scale system problem into a smaller one.

Containerization allows for much faster and efficient CI/CD pipelines. This is because of the light weight nature of containers it is very easy to spin multiple containers to perform different pipeline stages simultaneosuly. This makes sense, we use containers and docker commands in our CI/CD pipeline to spin up our applications while the pipeline continued to run its other tasks. 

Containers allow for quick recovery in the event that a system goes down. Because they can be spun up so quickly in the case of major issue that require a large system reboot, containers can be spun up quickly based off the the previous images being executed.

Kubernetes is used to manage and scale multiple containers. Using the two technologies allows things to scale greatly and in a efficient and automated way.

# Fun tid bits

I found a article called 11 Weird and Wonderful Uses For Docker. One of the uses was building your own version of Github. Which I thought was really cool, because you could make container that is running your application and its totally isolated from everything else. You could store you various projects on the running container. I just thought this was a fun and potentially cool project I could tackle by myself and enjoy it.


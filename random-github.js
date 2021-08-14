const baseUrl = "https://api.github.com";

const getRandomProfile = (profileList) => {
    const randomIndex = Math.ceil(Math.random() * profileList.length - 1);
    const randomProfile = profileList[randomIndex];
    return randomProfile;
    
};

const getPublicRepositories = async () => {
    const response = await fetch(`${baseUrl}/repositories`);
    const jsonResponse = await response.json();

    const randomProfile = getRandomProfile(jsonResponse);

    return randomProfile;
};

const getRepositoriesOwner = async (reposEndpoint) => {
    const reposResponse = await fetch(reposEndpoint);
    const jsonRepoResponse = await reposResponse.json();
    
    const responseRepos = jsonRepoResponse.slice(0, 5);

    return responseRepos;
};

const editProfile = async () => {
    const profileData = await getPublicRepositories();
    const avatarUrl = profileData.owner.avatar_url;
    const name = profileData.owner.login;
    const userRepos = await getRepositoriesOwner(profileData.owner.repos_url);

    const nameNode = document.querySelector("h1");
    const listNode = document.querySelector("#repos-list");
    listNode.innerHTML = "";
    nameNode.textContent = name;

    const userAvatar = document.querySelector("#avatar");
    userAvatar.src = avatarUrl;

    userRepos.forEach((repo) => {
        
        const li = document.createElement("li");
        const repoNode = document.createElement("a");
        repoNode.textContent = repo.html_url;
        repoNode.href = repo.html_url;
        li.appendChild(repoNode);
        listNode.appendChild(li);

    });

};

editProfile();

//efecto de la imagen
const userAvatar = document.querySelector("#avatar");

const changeImageRadius = () => {
    
    userAvatar.classList.toggle("circle-avatar");
    userAvatar.classList.toggle("square-avatar");

};
userAvatar.addEventListener("mouseenter", changeImageRadius);
userAvatar.addEventListener("mouseleave", changeImageRadius);

//boton de randon
const shuffleBtn = document.querySelector("button");

shuffleBtn.addEventListener("click", editProfile);

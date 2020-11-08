const getQueryParams =(param)=> {
    const url = new URL(window.location.href);
    return url.searchParams.get(param);
}

const navItemActive = ()=> {
    const navItems = document.querySelectorAll("a[name='nav-item']");
    const param = getQueryParams("item");

    if(typeof param === "string") {
        navItems.forEach(item => {
            if(item.id === `link-${param}`) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    } else {
        document.getElementById("link-viewEase").classList.add('active');
    }
}

const getItems = async ()=> {
    const response = await fetch("./data/slider.json",{headers:{"Content-Type":'application/json', mode: 'no-cors'}});
    return response.json();
}

const getNavItemData = async (item)=> {
    const {dataImages} = await getItems();

    const index = {
        prev:0,
        viewEase: 1,
        next:1
    }

    return dataImages[index[item] || 0];
}

const prepareDataToShow = async ()=> {
    try {
        const param = getQueryParams("item");
        const data = await getNavItemData(param);

        document.getElementById("logo").src = data.logo;
        document.getElementById("iconTrip").src = data.iconTrip;

        document.getElementById("title").innerHTML = data.title;
        document.getElementById("subtitle").innerHTML = data.subtitle;
        document.getElementById("hash").innerHTML = data.hash;

        document.getElementById("bgImage").style.backgroundImage = data.bgImage;
        document.getElementById("imageRocket").style.backgroundImage = data.imageRocket;
    } catch (error) {
        console.error(error)
    }
}

(()=>{
    window.onload= async ()=> {
        navItemActive();
        prepareDataToShow();
    }
})();
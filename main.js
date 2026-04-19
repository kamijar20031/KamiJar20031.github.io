const images = [{srcs:['imgs/img-0.png', 'imgs/img-1.png'], idx:0},
{srcs:['imgs/img-2.png', 'imgs/img-3.png'], idx:0},
{srcs:['imgs/img-4.png', 'imgs/img-5.png'], idx:0},
{srcs:['imgs/img-6.png', 'imgs/img-7.png', 'imgs/img-8.png'], idx:0},
{srcs: ['none.png'], idx:0},
{srcs:['imgs/img-9.png', 'imgs/img-10.png'], idx:0},
{srcs:['imgs/img-11.png', 'imgs/img-12.png', 'imgs/img-13.png'], idx:0},
{srcs:['imgs/img-14.png', 'imgs/img-15.png'], idx:0},
{srcs:['imgs/img-16.png', 'imgs/img-16.png'], idx:0},
{srcs:['imgs/img-17.png', 'imgs/img-18.png'], idx:0},
{srcs:['imgs/img-19.png', 'imgs/img-19.png'], idx:0},
{srcs:['imgs/img-20.png', 'imgs/img-20.png'], idx:0},
{srcs: ['none.png'], idx:0},
];
const sidePage = document.getElementById("sidePage")
const pages = [document.getElementById("page1"),document.getElementById("page2"), document.getElementById("page3")];
const numPages = pages.length;

var currentPage = 1;
var waitingPage = false;
var changeThemeFlag = false;

var r = document.querySelector(':root');

var darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (darkTheme)
{
    document.getElementById("theme").children[0].classList.add("icon-sun")
    document.getElementById("theme").children[0].classList.remove("icon-moon")
}

function changeIMG(id)
{
    const top = document.getElementById(`images_${id}Top`);
    const bottom = document.getElementById(`images_${id}Bottom`);
    let idx = (images[id].idx + 1) % images[id].srcs.length;
    let src = images[id].srcs[idx];
    top.src = src;
    top.style.opacity = 1;
    bottom.style.opacity = 0;
    setTimeout(() => {
        top.style.transition = "none";
        bottom.style.transition = "none";
        bottom.src = src;
        bottom.style.opacity = 1;
        top.style.opacity = 0;
        void bottom.offsetWidth;
        bottom.style.transition = "";
        top.style.transition = "";
        
    }, 500);
    images[id].idx = idx;
}

function changeThemeInner()
{
    if (!changeThemeFlag) 
        {
            changeThemeFlag = true;
            if (darkTheme) 
            {
                r.style.colorScheme = "light";
                document.getElementById("theme").children[0].classList.add("icon-moon")
                document.getElementById("theme").children[0].classList.remove("icon-sun")
            }
            else 
            {
                r.style.colorScheme = "dark";
                document.getElementById("theme").children[0].classList.add("icon-sun")
                document.getElementById("theme").children[0].classList.remove("icon-moon")
            }
            setTimeout(() => {
                changeThemeFlag = false;
            }, 500)
            darkTheme = !darkTheme;
        }
}

function changeTheme()
{
    if (!document.startViewTransition)
        changeThemeInner();
    else
        document.startViewTransition(() => {
            changeThemeInner();
        });

}

function slideSidePage()
{
    sidePage.style.left = "2.5vw";
}

function nextPage()
{
    
    if (currentPage<numPages && !waitingPage)
    {
        waitingPage = true;
        pages[currentPage].style.animationName = "scrollUp";
        pages[currentPage].addEventListener('animationend', () => {
            waitingPage=false;
        }, { once: true });
        currentPage++;
    }
}
function prevPage()
{
    
    if (currentPage>1  && !waitingPage)
    {
        waitingPage = true;
        currentPage--;
        pages[currentPage].style.animationName = "scrollDown";
        pages[currentPage].addEventListener('animationend', () => {
            waitingPage=false;
        }, { once: true });
        
    }
}

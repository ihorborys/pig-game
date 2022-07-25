import { getRandom } from "./utils.js";

const MIN = 1;
const MAX = 6;
const DEG = 360;

const cubeSidesList = [
    { name: "front", rotation: [0, 0] },
    { name: "back", rotation: [180, 360] },
    { name: "right", rotation: [0, -90] },
    { name: "left", rotation: [0, 90] },
    { name: "top", rotation: [-90, 0] },
    { name: "bottom", rotation: [90, 0] }
];

export const initCube = () => {
    const cube = document.querySelector("#cube");

    cubeSidesList.forEach((side, i) => {
        const cubeSide = createCubeSide(side.name, i + 1);
        cube.appendChild(cubeSide);
    });

    return cube;
}

/**
 * Rotates cube
 * @param {HTMLElement} cube
 * @returns {number} Randomly generated side of the cube
 */
export const rotateCube = (cube) => {
    // const randomData = { side: 4, x: 5, y: 3 }
    const randomData = generateRandomData(MIN, MAX, DEG);

    // cube.style.transform = "rotateX(1800deg) rotateY(1080deg)"
    cube.style.transform = `
        rotateX(${randomData.x + cubeSidesList[randomData.side - 1].rotation[0]}deg)
        rotateY(${randomData.y + cubeSidesList[randomData.side - 1].rotation[1]}deg)
    `
    return randomData.side;
}

/**
 * 
 */
const createCubeSide = (sideName, sideNumber) => {
    const sideContainer = document.createElement("div");
    const sideImage = document.createElement("img");
    sideContainer.classList.add(sideName);
    sideImage.setAttribute("src", `../assets/images/dice-${sideNumber}.png`);
    sideContainer.appendChild(sideImage);
    return sideContainer;
}

const generateRandomData = (min, max, deg) => {
    const cubeSide = getRandom(min, max);
    const xRand = getRandom(min, max) * deg;
    const yRand = getRandom(min, max) * deg;

    return {
        side: cubeSide,
        x: xRand,
        y: yRand
    }
}
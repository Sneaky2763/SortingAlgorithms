
let n = 16;
let k = n;
let maxElement = 0;
let array = [];
let isPlaying = 0;
let playBubble = 1;
let playSelection = 0;
let playSelectionMin = 0;
let playInsertion = 0;
let sortSpeed = 1;
let setSpeed = 10;
let pause = 0;
let insertionLastComp = 1;
let playSound = 1;


function stopSort(){
	if(isPlaying){
		pause = 1;
	}
}

function makeArray(){
	if(!isPlaying){
		n = document.getElementById("arraySize").value;
		array = [];
		if(n<8){
			arraySize.value=8;
			n = document.getElementById("arraySize").value;
		}
		if(n>64){
			arraySize.value=64;
			n = document.getElementById("arraySize").value;
		}
		for(let i=0;i<n;i++){
				array[i]=((1/(n+1))*i + 1/(n+1))*10;
			}
		sortSpeed = 1600/(n*n);
		shuffle();
	}
}
	
function selectBubble(){
	if(!isPlaying){
		playBubble = 1;
		playSelection = 0;
		playSelectionMin = 0;
		playInsertion = 0;
		bubbleButton.style.backgroundColor = "#9effa6";
		selectionButton.style.backgroundColor = "#eeeeee";
		insertionButton.style.backgroundColor = "#eeeeee";
		selectionMinButton.style.backgroundColor = "#eeeeee";
	}
}
function selectSelection(){
	if(!isPlaying){
		playBubble = 0;
		playSelection = 1;
		playSelectionMin = 0;
		playInsertion = 0;
		bubbleButton.style.backgroundColor = "#eeeeee";
		selectionButton.style.backgroundColor = "#9effa6";
		insertionButton.style.backgroundColor = "#eeeeee";
		selectionMinButton.style.backgroundColor = "#eeeeee";
	}
}
function selectInsertion(){
	if(!isPlaying){
		playBubble = 0;
		playSelection = 0;
		playSelectionMin = 0;
		playInsertion = 1;
		bubbleButton.style.backgroundColor = "#eeeeee";
		selectionButton.style.backgroundColor = "#eeeeee";
		insertionButton.style.backgroundColor = "#9effa6";
		selectionMinButton.style.backgroundColor = "#eeeeee";
	}
}
function selectSelectionMin(){
	if(!isPlaying){
		playBubble = 0;
		playSelection = 0;
		playSelectionMin = 1;
		playInsertion = 0;
		bubbleButton.style.backgroundColor = "#eeeeee";
		selectionButton.style.backgroundColor = "#eeeeee";
		insertionButton.style.backgroundColor = "#eeeeee";
		selectionMinButton.style.backgroundColor = "#9effa6";
	}
}


let audioCtx=null;

makeArray();
shuffle();
selectBubble();
soundStatus();

function shuffle(){
	if(!isPlaying){
		for(let i=0;i<n;i++){
			const j = Math.floor(Math.random()*(i+1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
    showBars();
}


function startSort(){
	if(!isPlaying){
		startSortButton.style.backgroundColor="#9effa6";
		startSortButton.textContent="Сортировка выполняется";
		if (playBubble){
			const moves=bubbleSort([...array]);
			animateBubble(moves);
		}
		if (playSelection){
			const moves=selectionSort([...array]);
			animateSelection(moves);
		}
		if (playInsertion){
			const moves=insertionSort([...array]);
			animateInsertion(moves);
		}
		if (playSelectionMin){
			const moves=selectionMinSort([...array]);
			animateSelectionMin(moves);
		}
	}
}

function animateBubble(moves){
	isPlaying = 1;
    if(moves.length==0 || pause){
        showBars();
		startSortButton.style.backgroundColor="#eeeeee";
		startSortButton.textContent="Начать сортировку";
		isPlaying=0;
		pause = 0;
        return;
    }
    const move=moves.shift(0);
	const [i,j] = move.index;
	
	if(move.type=="swap"){
		[array[i],array[j]]=[array[j],array[i]];
    }
	
	showBars(move);
	
    playNote(200+array[i]*500);
    playNote(200+array[j]*500);
	
	setSpeed = document.getElementById("setSpeed").value;

    setTimeout(function(){
        animateBubble(moves);
    },300 * sortSpeed / setSpeed);
}

function bubbleSort(array){
    const moves=[];
	k = n;
    do{
        var swapped=false;
        for(let i=1;i<k;i++){
			moves.push({index:[i-1,i], type:"comparison"});
            if(array[i-1]>array[i]){
                moves.push({index:[i-1,i], type:"swap"});
                swapped=true;
                [array[i-1],array[i]]=[array[i],array[i-1]];
            }
        }
		k=k-1;
    }while(swapped);
    return moves;
}

function animateSelection(moves){
	isPlaying = 1;
    if(moves.length==0 || pause){
        showBars();
		startSortButton.style.backgroundColor="#eeeeee";
		startSortButton.textContent="Начать сортировку";
		isPlaying=0;
		pause = 0;
        return;
    }
    const move=moves.shift(0);
	const [i,j] = move.index;
	
	if(move.type=="swap"){
		[array[i],array[j]]=[array[j],array[i]];
    }
	
	showBars(move);
	
    playNote(200+array[i]*500);
    playNote(200+array[j]*500);
	
	setSpeed = document.getElementById("setSpeed").value;

    setTimeout(function(){
        animateSelection(moves);
    },300 * sortSpeed / setSpeed);
}

function selectionSort(array){
    const moves=[];
	k = n;
    do{
        var swapped=false;
		let maxElement=0;
		for(let i=0;i<k;i++){
			moves.push({index:[maxElement,i], type:"comparison"});
			if(array[i]>array[maxElement]){
				maxElement = i;
			}
		}
		if(maxElement!=k-1){
			moves.push({index:[maxElement,k-1], type:"swap"});
			swapped=true;
			[array[maxElement],array[k-1]]=[array[k-1],array[maxElement]];
		}
		k=k-1;
    }while(k>0);
    return moves;
}

function animateSelectionMin(moves){
	isPlaying = 1;
    if(moves.length==0 || pause){
        showBars();
		startSortButton.style.backgroundColor="#eeeeee";
		startSortButton.textContent="Начать сортировку";
		isPlaying=0;
		pause = 0;
        return;
    }
    const move=moves.shift(0);
	const [i,j] = move.index;
	
	if(move.type=="swap"){
		[array[i],array[j]]=[array[j],array[i]];
    }
	
	showBars(move);
	
    playNote(200+array[i]*500);
    playNote(200+array[j]*500);
	
	setSpeed = document.getElementById("setSpeed").value;

    setTimeout(function(){
        animateSelection(moves);
    },300 * sortSpeed / setSpeed);
}

function selectionMinSort(array){
    const moves=[];
	k = 0;
    do{
        var swapped=false;
		let minElement=n-1;
		for(let i=k;i<n;i++){
			moves.push({index:[minElement,i], type:"comparison"});
			if(array[i]<array[minElement]){
				minElement = i;
			}
		}
		if(minElement!=k){
			moves.push({index:[minElement,k], type:"swap"});
			swapped=true;
			[array[minElement],array[k]]=[array[k],array[minElement]];
		}
		k=k+1;
    }while(k<n);
    return moves;
}

function animateInsertion(moves){
	isPlaying = 1;
    if(moves.length==0 || pause){
        showBars();
		startSortButton.style.backgroundColor="#eeeeee";
		startSortButton.textContent="Начать сортировку";
		isPlaying=0;
		pause = 0;
        return;
    }
    const move=moves.shift(0);
	const [i,j] = move.index;
	
	if(move.type=="swap"){
		[array[i],array[j]]=[array[j],array[i]];
    }
	
	showBars(move);
	
    playNote(200+array[i]*500);
    playNote(200+array[j]*500);
	
	setSpeed = document.getElementById("setSpeed").value;

    setTimeout(function(){
        animateInsertion(moves);
    },300 * sortSpeed / setSpeed);
}


function insertionSort(array){
    const moves=[];
	k = 1;
    do{
        var swapped=false;
		insertionLastComp = 1;
        for(let i=k;i>=1;i--){
            while(array[i]<array[i-1]){
				moves.push({index:[i-1,i], type:"comparison"});
                moves.push({index:[i,i-1], type:"swap"});
                swapped=true;
                [array[i],array[i-1]]=[array[i-1],array[i]];
            }
			if(array[i-1]>array[i-2] && insertionLastComp){
				moves.push({index:[i-2,i-1], type:"comparison"});
				insertionLastComp = 0;
			}
        }
		k=k+1;
    }while(k<n);
    return moves;
}




function showBars(move){
    container.innerHTML="";
    for(let i=0;i<array.length;i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");
        if(move && move.index.includes(i)){
			if(move.type=="swap"){
				bar.style.backgroundColor="red";
			} else {
				bar.style.backgroundColor="blue";
			}
        }
        container.appendChild(bar);
    }   
}

function soundStatus(){
	if(playSound%2==1){
		soundButton.style.backgroundColor = "#9effa6";
		playSound+=1;
	} else {
		soundButton.style.backgroundColor = "#fc9f9f";
		playSound+=1;
	}
}

function playNote(freq){
	if(playSound%2==0){
		if(audioCtx==null){
			audioCtx=new(
				AudioContext || 
				webkitAudioContext || 
				window.webkitAudioContext
			)();
		}
		const dur=0.1;
		const osc=audioCtx.createOscillator();
		osc.frequency.value=freq;
		osc.start();
		osc.stop(audioCtx.currentTime+dur);
		const node=audioCtx.createGain();
		node.gain.value=0.1;
		node.gain.linearRampToValueAtTime(
			0, audioCtx.currentTime+dur
		);
		osc.connect(node);
		node.connect(audioCtx.destination);
	}
}

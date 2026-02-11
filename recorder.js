let mediaRecorder;
let chunks = [];

function startRecord(){
  navigator.mediaDevices.getUserMedia({audio:true})
  .then(stream=>{
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    chunks = [];
    mediaRecorder.ondataavailable = e => chunks.push(e.data);
  });
}

function stopRecord(){
  mediaRecorder.stop();
  mediaRecorder.onstop = () =>{
    const blob = new Blob(chunks,{type:'audio/webm'});
    const url = URL.createObjectURL(blob);
    document.getElementById("playUser").src = url;
  };
}

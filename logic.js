let preview = document.getElementById("preview");
let recording = document.getElementById("recording");
let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");

let mediaRecorder;
let recordedChunks = [];

async function startCamera() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        preview.srcObject = stream;
            
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => {
    recordedChunks.push(event.data);
                                };
                                    
                                   mediaRecorder.onstop = () => {
                                   let blob = new Blob(recordedChunks, { type: "video/webm" });
                                                        recording.src = URL.createObjectURL(blob);
                                                                recordedChunks = [];
                                                                    };
                                                                    }

                                                                startBtn.onclick = () => {
                                                                recordedChunks = [];
                                                                mediaRecorder.start();
                                                                startBtn.disabled = true;
                                                                stopBtn.disabled = false;
                                                                };

                                                                stopBtn.onclick = () => {
                                                                                        mediaRecorder.stop();
                                                                                            startBtn.disabled = false;
                                                                                                stopBtn.disabled = true;
                                                                                                };

                                                                                                startCamera();
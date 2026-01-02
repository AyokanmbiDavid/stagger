import { useState, useRef } from 'react';
import { Mic, Square, Send } from 'lucide-react';

const VoiceRecorder = ({ onSendAudio }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      onSendAudio(audioBlob);
    };

    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current.stop();
    setIsRecording(false);
  };

  return (
    <button 
      type="button"
      onMouseDown={startRecording} 
      onMouseUp={stopRecording}
      className={`p-2 rounded-full ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}
    >
      <Mic size={20} />
    </button>
  );
};

export default VoiceRecorder;
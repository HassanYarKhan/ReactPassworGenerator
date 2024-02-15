import { useCallback, useRef, useState } from 'react';
import './App.css'

function App() {
  
  /**
  * 
  * we need to maintain 3 things  -  the length of the password
  *                               -  addition of numbers 
  *                               -  addition of special characters
  *                               - upper and lowercases letters
  * 
  **/

  const [length, setLength] = useState(8);
  const [addNums, setAddNums] = useState(false);
  const [specialChars, setSpecialChars] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);

  // we need to have a state for a passwrd as well
  const [password, setPassword] = useState("");

  // we need to have another state to hold the password strength
  let [strength, setStrength] = useState("");

  const passwordRef = useRef(null);
 
  function generatePassword(){
     let pswd = '';
     let str = '';

     if(lowerCase === true)
      str += "qwertyuioplkjhgfdsazxcvbnnm"
     
     if(upperCase === true)
      str += "QWERTYUIOPLKJHGFDSAZXCVBNM"

     if(addNums === true)
      str += "1234567890";

     if(specialChars === true)
      str += "!@#$%^&*()_+-*/{}[]/.?><.,|"

     for(let i = 0; i < length; i++)
     {
        let randomIndex = Math.floor(Math.random() * str.length);
        pswd += str.charAt(randomIndex);
     }
     setPassword(pswd);

  }

  useCallback(() => {generatePassword()}, addNums, upperCase, lowerCase, specialChars, length , password)

  const [weak, setWeak] = useState('linear-gradient(rgb(71 85 105),rgb(71 85 105))');
  const [moderate, setModerate] = useState('linear-gradient(rgb(71 85 105),rgb(71 85 105))');
  const [strong, setStrong] = useState('linear-gradient(rgb(71 85 105),rgb(71 85 105))');

  function passwordStrength(){
   
    if(upperCase && lowerCase && addNums && specialChars && (length >= 8)){  
        setStrength("Strong")
        setStrong('linear-gradient(to right, yellowgreen , green)')
        setModerate("linear-gradient(to right, yellow , yellowgreen)");
        setWeak("linear-gradient(to right, red , yellow)");

    }

    else if((upperCase || lowerCase) && specialChars && length >= 6){ 
        setStrength("Moderate")
        setStrong('linear-gradient(rgb(71 85 105),rgb(71 85 105))')
        setModerate("linear-gradient(to right, yellow , yellowgreen)");
        setWeak("linear-gradient(to right, red , yellow)");
        
    }

    else {
      setStrength("Weak");
      setStrong('linear-gradient(rgb(71 85 105),rgb(71 85 105))')
      setModerate('linear-gradient(rgb(71 85 105),rgb(71 85 105))')
      setWeak("linear-gradient(to right, red , yellow)");
    } 
   }

   function copyToClipBoard(){
      console.log(passwordRef.current?.value);
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(passwordRef.current?.value);

   }
    

   function buttonClicked(){
      generatePassword();
      if(password != "")
        passwordStrength();
   }
  return (
    <div className='w-lvw h-lvh bg-blue-950 flex justify-center items-center text-white '>

        <div className='w-full max-w-md mx-auto flex flex-col bg-blue-900 rounded-2xl px-2 py-3 shadow-2xl '>

          <h1 className='text-center text-2xl font-bold relative top-2 mb-8'> 🔐 PASSWORD GENERATOR</h1>

          <div className='flex justify-center'>

            <input type="text"
              value={password}
              placeholder='Password'
              readOnly
              className='py-1 px-3 rounded-s-full bg-blue-950'
              ref={passwordRef}
            />

            <button className='bg-blue-950 px-3 py-1 shrink-0 rounded-e-full border-blue-800 border-s-2'
            onClick={copyToClipBoard}
            onMouseEnter={(e)=>{
              e.target.style.backgroundColor = "rgb(29 78 216)";
            }}
            onMouseLeave={(e)=>{
              e.target.style.backgroundColor = "rgb(23 37 84)";
            }}
            >Copy</button>

        </div>


        <div className='flex justify-center'>
          <input type="range" 
          min={6}
          max={16}
          value={length}
          className='w-3/5 px-3 py-4' 

          //* The onChange event handler returns an event (e) which contains all the meta data such as the id, value, name of the target.
          onChange={(e) => {
            setLength(e.target.value)
          }}/>
          <label className='px-3 py-4'>Length : {length}</label>
        </div>

        <div className='mx-10'>
          <input type="checkbox"
           defaultValue={upperCase}
           onChange={() => setUpperCase((prev) => !prev)}
            />
          <label className='mx-2 text-lg'>UpperCase</label>
        </div> 

        <div className='mx-10'>
          <input type="checkbox"
           defaultValue={lowerCase}
           onChange={() => setLowerCase((prev) => !prev)}
            />
          <label className='mx-2 text-lg'>LowerCase</label>
        </div>

        <div className='mx-10'>
          <input
           type="checkbox"
           defaultValue={specialChars}
           onChange={() => setSpecialChars((prev) => !prev)}
            />
          <label className='mx-2 text-lg'>Special Characters</label>
        </div>

        <div className='mx-10'>
          <input
           type="checkbox" 
           defaultValue={addNums}
           onChange={() => setAddNums((prev) => !prev)}
          />
          <label className='mx-2 text-lg'>Numbers</label>
        </div>
        <div className='flex flex-row justify-center pt-8'>
          <span className='w-1/5 h-1 rounded-l' style={{backgroundImage : weak}}></span>
          <span className='w-1/5 h-1' style={{backgroundImage : moderate}}></span>
          <span className='w-1/5 h-1 rounded-r' style={{backgroundImage : strong}}></span>
        </div>
        <p className='text-center mt-4'>{strength}</p>
        <button className='bg-blue-950 text-2xl font-semibold my-4 py-1 rounded-2xl shadow-black' 
        onClick={buttonClicked}

        onMouseEnter={(e)=>{
          e.target.style.backgroundColor = "rgb(29 78 216)";
        }}

        onMouseLeave={(e)=>{
          e.target.style.backgroundColor = "rgb(23 37 84)";
        }}

        >GENERATE</button>
        </div>
    </div>
  )
}

export default App

import React, { useEffect , useId, useState } from 'react'
import axios from 'axios'
import { USER_API } from './url.js'
import {Button, Popover , Progress } from 'antd'
import './card.css'
import { useNavigate } from 'react-router-dom'
let scores = [0,1,2,3,4,5]


const FlashCard = ({message}) => {
  const [cardNum , setCardNum] = useState(0)
  const [lastView , setLastView] = useState("")
  const [nextRevise , setNextRevise] = useState("")
  const [progress , setProgress] = useState(0)
  const [isScored, setIsScored] = useState(false)
  const [showProgress , setShowProgress] = useState(false)


  const generateRandomNumberCard = () => {
    const random_num = Math.floor(Math.random() * 100) + 1;
    setCardNum(random_num)
    setIsScored(false)
  }

  useEffect(() => {
    generateRandomNumberCard()
  },[])

  const updateUserCardData = async(card_num , score) => {
    if (isScored) return;
    setIsScored(true);
    const token = localStorage.getItem("token")
    setProgress(prevProgress => prevProgress + 1) 
    const res = await axios.post(`${USER_API}/card`, 
      { card_num, score }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const modifiedLastViewDate = new Date(res.data.lastReviewedDate).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const modifiedNextReviseDate = new Date(res.data.nextReviewDate).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    setLastView(modifiedLastViewDate)
    setNextRevise(modifiedNextReviseDate)
  }

  const navigate = useNavigate();

  const removeCurrentUser = () => {
    localStorage.removeItem("token");
    navigate('/login');
  }


  const content = (
  <div>
    <p>0 - You just do a hit & try</p>
    <p>1 - Perfect recall</p>
    <p>2 - Correct, but with hesitation</p>
    <p>3 - Correct, but difficult</p>
    <p>4 - Incorrect, remembered after the hint</p>
    <p>5 - Incorrect, wrong guess</p>
  </div>
  )

  const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
  };

  return (
    <>
    <div className='user-card_box'>
      <button onClick={() => setShowProgress(true)}>See Your Progress</button>
      <p id="message">{`🎯 ${message} let's learn 💡`}</p>
      <div className='card'>

        { 
        showProgress ? 
        <>
        <Progress type="circle" percent={progress * 10} strokeColor={twoColors} />
        <p>You have completed : {progress} / 10  revisions</p>
        <button id="close-btn" onClick={() => setShowProgress(false)}>Close</button>
        </> 
        :
        <>
        <p id='card-number'>{cardNum}</p>
        <Popover content={content} title="KNOW ABOUT RECALL QUALITY SCORE">
          <Button>What does your score mean?</Button>
        </Popover>
        <p id="score-input-title">Score Yourself From 0 to 5</p>
        <div id="score-btn-grp">
          {
            scores.map((score) => {
              return <button disabled={isScored} onClick={() => updateUserCardData(cardNum , score)}>{score}</button>
            })
          }
        </div>
        <div id='date-box'>
          <div>
            <p>Last Seen At</p>
            <p><b>{lastView}</b></p>
          </div>
          <div>
            <p>Next Revise At</p>
            <p><b>{nextRevise}</b></p>
          </div>
        </div>
        <button id="card-btn" onClick={generateRandomNumberCard}>Generate Card</button>
        </> 
      }
      </div>
      <div id='logout-btn-box'>
        <span style={{color : "white" , fontSize : "1.5rem"}}>Want To Leave ?</span>
        <button onClick={removeCurrentUser}>Logout</button>
      </div>
    </div>  
    </>
  )
}

export default FlashCard
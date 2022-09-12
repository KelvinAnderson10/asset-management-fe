import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDeps } from '../../shared/context/DependencyContext'
import './Dashboard.css'

export const Dashboard = () => {
    const {eventLogService, overviewService} = useDeps()
    const [event, setEvent] = useState([])
    const [countAsset, setCountAsset] = useState(0)

    const getAllEventLog = async () => {
        try{
            const response = await eventLogService.getEventLog()
            for (let i in response.data) {
                response.data[i]['CreatedAt'] = moment((response.data[i]['CreatedAt'])).format('YYYY-MM-DDTHH:MM')
            }
            setEvent(response.data)
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const onCountAsset = async () => {
        try {
          const response = await overviewService.getCountAllAsset()
          setCountAsset(response.data)
        } catch (e) {
          console.log(e);
        }
      }

    useEffect(() => {
        getAllEventLog()
        onCountAsset()
    }, [])

    return(
        <>
            <div className='dashboard-container'>
                <div className='dashboard-card'>
                    <div className='content-dashboard'>
                        <div className='content-dashboard-top'>
                            <div className='count-dashboard' style={{backgroundColor:"#E9EBE3"}}>
                                <div className='content-icon'>
                                    <i className="fa fa-building-o" style={{color:'#92A85F'}}/>
                                </div>
                                <div className='content-non-icon'>
                                    <a className='count-number'>{countAsset} </a>
                                    <a>Total Asset</a>
                                </div>                            
                            </div>
                            <div className='count-dashboard' style={{backgroundColor:""}}>
                                
                            </div>
                            <div className='count-dashboard'>
                                
                            </div>
                            <div className='count-dashboard'>
                                
                            </div>
                        </div>
                        <div className='content-dashboard-bottom'>
                            <div className='grafik-box'>

                            </div>
                            <div className='grafik-box'>
                                
                            </div>
                        </div>
                        
                    </div>
                    <div className='eventlog-container'>
                        <h5>Recent Alert</h5>
                        <div className='eventlog-box'>
                            {event.length === 0 ? (
                                <p></p>
                            ): (
                                event.map((data) => (
                                    <div className='eventlog-box-content'>
                                        <a>{data.user}</a>
                                        <a> : </a>
                                        <a>{data.event}</a>
                                        <br/>
                                        <a style={{color:'white'}}>{data.CreatedAt}</a>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


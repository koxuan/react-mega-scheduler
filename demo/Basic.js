import React, {Component} from 'react'
import moment from 'moment'
//import 'moment/locale/zh-cn';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT, CellUnits, DATETIME_FORMAT} from '../src/index'
import withDragDropContext from './withDnDContext'
import '../lib/css/style.css'

class Basic extends Component{
    constructor(props){
        super(props);
        let resources = [
        
        //   {
        //      id: 'r1',
        //      name: 'StaffA'
        //   },
        //   {
        //      id: 'r2',
        //      name: 'StaffC',
          
        //   },
        //   {
        //      id: 'r3',
        //      name: 'ManagerB',
        
        //   },
        //   {
        //      id: 'r4',
        //      name: 'ManagerA',
            
        //   },
      ];
        //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
        let today = new Date()
        today.setHours(0,0,0,0);
        let schedulerData = new SchedulerData(moment(today).add(9, 'hours').format(DATETIME_FORMAT),moment(today).add(18, 'hours').subtract(1, 'days').format(DATETIME_FORMAT),new Date(), ViewTypes.Custom, false, false,{eventItemPopoverEnabled: false,
            customCellWidth: 12,
            views: [
                {viewName: 'Daily Scheduling', viewType: ViewTypes.Custom, showAgenda: false, isEventPerspective: false},
                // {viewName: 'Weekly Scheduling', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false},
          
            ], // minuteStep: 15
        },{
            getCustomDateFunc: this.getCustomDate,
            getDateLabelFunc: this.getDateLabel,
        });
        // schedulerData.localeMoment.locale('en');
       
        schedulerData.setResources(resources);
        // schedulerData.setEvents(DemoData.events);
        schedulerData.setMinuteStep(6);
     
        schedulerData.startDate = moment(today).add(9, 'hours').format(DATETIME_FORMAT)
        schedulerData.endDate = moment(today).add(18, 'hours').subtract(1, 'days').format(DATETIME_FORMAT)
        console.log(schedulerData.startDate)
        console.log(schedulerData.endDate)
        this.state = {
            viewModel: schedulerData
        }
        this.schedulerData = schedulerData;
    }

    componentDidMount() {
        // let resources = [   {
        //     id: 'r1',
        //     name: 'StaffA'
        //  },
        //  {
        //     id: 'r2',
        //     name: 'StaffC',
         
        //  },
        //  {
        //     id: 'r3',
        //     name: 'ManagerB',
       
        //  },
        //  {
        //     id: 'r4',
        //     name: 'ManagerA',
           
        //  },];

        fetch('/staffs')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        const resources = data.filter(x => {
                return x.empStaffSgroup = 'T'
            }).map(x => {
        
            return {id: x.empStaffId, name:x.empStaffName}
          });
        console.log()
        this.number =  3
        this.schedulerData.setResources(resources);
        this.state = {
            viewModel: this.schedulerData
        }
        this.schedulerData.setResources(resources);
        this.state = {
           viewModel: this.schedulerData
       }
       this.schedulerData.refresh();
        });
       
    }

    render(){
        const {viewModel} = this.state;
        // console.log(DemoData.events);
        return (
            <div>
                <div>
                    <Scheduler schedulerData={viewModel}
                               prevClick={this.prevClick}
                               nextClick={this.nextClick}
                               onSelectDate={this.onSelectDate}
                               onViewChange={this.onViewChange}
                               eventItemClick={this.eventClicked}
                            //    viewEventClick={this.ops1}
                            //    viewEventText="Ops 1"
                            //    viewEvent2Text="Ops 2"
                            //    viewEvent2Click={this.ops2}
                               updateEventStart={this.updateEventStart}
                               updateEventEnd={this.updateEventEnd}
                               moveEvent={this.moveEvent}
                               newEvent={this.newEvent}
                    />
                </div>
            </div>
        )
    }


    getCustomDate = (schedulerData, num, date = undefined) => {

        
        return {

            startDate:  moment(schedulerData.startDate).add(num, 'days').format(DATETIME_FORMAT),
            endDate : moment(schedulerData.endDate).add(num, 'days').format(DATETIME_FORMAT),
            cellUnit : CellUnits.Hour,
        };
//         const {viewType} = schedulerData;
//         let selectDate = schedulerData.startDate;
//         if(date != undefined)
//             selectDate = date;   
// console.log(schedulerData.localeMoment(selectDate))

//         let startDate = num === 0 ? selectDate : 
//             schedulerData.localeMoment(selectDate).add(3, 'hours').format(DATETIME_FORMAT);
//         let start =schedulerData.localeMoment(selectDate)._d;
//         start.setHours(start.getHours() + 9);
//         startDate = schedulerData.localeMoment(start).format(DATETIME_FORMAT);
//        console.log(schedulerData.localeMoment(selectDate)._d)
//         console.log( schedulerData.localeMoment(selectDate));
//         let current = schedulerData.localeMoment(selectDate)._d;
//         current.setDate(current.getDate() - 1)
//         console.log(current.setHours(current.getHours() + 18))
//         console.log(current)
//         let endDate = schedulerData.localeMoment(current).format(DATETIME_FORMAT),
//             cellUnit = CellUnits.Hour;
        
//             console.log(schedulerData.localeMoment(endDate))
        // if(viewType === ViewTypes.Custom1) {
        //     let monday = schedulerData.localeMoment(selectDate).startOf('week').format(DATE_FORMAT);
        //     startDate = num === 0 ? monday : schedulerData.localeMoment(monday).add(num, 'weeks').format(DATE_FORMAT);
        //     endDate = schedulerData.localeMoment(startDate).add(1, 'weeks').endOf('week').format(DATE_FORMAT);
        //     cellUnit = CellUnits.Day;
        // } else if(viewType === ViewTypes.Custom2) {
        //     let firstDayOfMonth = schedulerData.localeMoment(selectDate).startOf('month').format(DATE_FORMAT);
        //     startDate = num === 0 ? firstDayOfMonth : schedulerData.localeMoment(firstDayOfMonth).add(2*num, 'months').format(DATE_FORMAT);
        //     endDate = schedulerData.localeMoment(startDate).add(1, 'months').endOf('month').format(DATE_FORMAT);
        //     cellUnit = CellUnits.Day;
        // }
            
        return {
            // startDate,
            // endDate,
            // cellUnit
        };
    }

    prevClick = (schedulerData)=> {
        schedulerData.prev();
        // schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        
        schedulerData.next();
        // schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
    
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        // schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }
    getDateLabel = (schedulerData, viewType, startDate, endDate) => {
        let start = schedulerData.localeMoment(startDate);
        let end = schedulerData.localeMoment(endDate);
        let dateLabel = start.format('YYYY年M月D日');

        if(viewType === ViewTypes.Custom) {
            dateLabel = `${start.format('DD MMM YYYY')}`;
            // if(start.month() !== end.month())
            //     dateLabel = `${start.format('YYYY年M月D日')}-${end.format('M月D日')}`;
            // if(start.year() !== end.year())
            //     dateLabel = `${start.format('YYYY年M月D日')}-${end.format('YYYY年M月D日')}`;
        }
        else if(viewType === ViewTypes.Month){
            dateLabel = start.format('YYYY年M月');
        }
        else if(viewType === ViewTypes.Quarter){
            dateLabel = `${start.format('YYYY年M月D日')}-${end.format('M月D日')}`;
        }
        else if(viewType === ViewTypes.Year) {
            dateLabel = start.format('YYYY年');
        }

        return dateLabel;
    }
    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        
        // schedulerData.setEvents(DemoData.events);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = (schedulerData, event) => {
        alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
      console.log(start)
      console.log(end)
        let newFreshId = 0;
        schedulerData.events.forEach((item) => {
            if(item.id >= newFreshId)
                newFreshId = item.id + 1;
        });

        let newEvent = {
            id: newFreshId,
            title: 'New event you just created',
            start: start,
            end: end,
            resourceId: slotId,
            bgColor: 'purple'
        }
        schedulerData.addEvent(newEvent);
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventStart = (schedulerData, event, newStart) => {
        schedulerData.updateEventStart(event, newStart);
        this.setState({
            viewModel: schedulerData
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        schedulerData.updateEventEnd(event, newEnd);
        this.setState({
            viewModel: schedulerData
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        schedulerData.moveEvent(event, slotId, slotName, start, end);
        this.setState({
            viewModel: schedulerData
        })
    }
}

export default withDragDropContext(Basic)

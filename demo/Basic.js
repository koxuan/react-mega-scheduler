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
        
          {
             id: 'r1',
             name: 'StaffA'
          },
          {
             id: 'r2',
             name: 'StaffC',
          
          },
          {
             id: 'r3',
             name: 'ManagerB',
        
          },
          {
             id: 'r4',
             name: 'ManagerA',
            
          },
      ];
        //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
        let schedulerData = new SchedulerData(moment(Date()).startOf('day'), ViewTypes.Custom, false, false,{eventItemPopoverEnabled: false,
            customCellWidth: 80,
            dayCellWidth:90,
            views: [
                {viewName: 'Daily Scheduling', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false},
              
          
            ], // minuteStep: 15
        },{
            getCustomDateFunc: this.getCustomDate,
            //getDateLabelFunc: this.getDateLabel,
        });
        // schedulerData.localeMoment.locale('en');
       
        schedulerData.setResources(resources);
        // schedulerData.setEvents(DemoData.events);
        schedulerData.setMinuteStep(720);
        let today = new Date()
        today.setHours(0,0,0,0);
        // schedulerData.startDate = moment(today).add(9, 'hours').format(DATETIME_FORMAT)
        // schedulerData.endDate = moment(today).add(18, 'hours').subtract(1, 'days').format(DATETIME_FORMAT)
        console.log(schedulerData.startDate)
        console.log(schedulerData.endDate)
        this.state = {
            viewModel: schedulerData
        }
    }
       nonAgendaCellHeaderTemplateResolver = (schedulerData, item, formattedDateItems, style) => {
      let datetime = schedulerData.localeMoment(item.time);
      let isCurrentDate = false;

      if (schedulerData.viewType === ViewTypes.Day) {
          isCurrentDate = datetime.isSame(new Date(), 'hour');
      }
      else {
          isCurrentDate = datetime.isSame(new Date(), 'day');
      }

    //   if (isCurrentDate) {
    //       style.backgroundColor = '#118dea';
    //       style.color = 'white';
    //   }

      return (
          <th key={item.time} className={`header3-text`} style={style}>
              {
                  formattedDateItems.map((formattedItem, index) => (
                      <div key={index}
                           dangerouslySetInnerHTML={{__html: formattedItem.replace(/[0-9]/g, '<b>$&</b>')}}/>
                  ))
              }
          </th>
      );
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
                               nonAgendaCellHeaderTemplateResolver = {this.nonAgendaCellHeaderTemplateResolver}
                    />
                </div>
            </div>
        )
    }


    getCustomDate = (schedulerData, num, date = undefined) => {

        return {
            startDate:  moment(schedulerData.startDate).startOf('day').format(DATETIME_FORMAT),
            endDate : moment(schedulerData.endDate).startOf('day').add(6, 'days').format(DATETIME_FORMAT),
            cellUnit : CellUnits.Hour,
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
        console.log(start, end)
      
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

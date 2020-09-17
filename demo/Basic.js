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
        let schedulerData = new SchedulerData(moment(today),moment(today).add(24, 'hours').format(DATETIME_FORMAT),new Date(), ViewTypes.Custom, false, false,{eventItemPopoverEnabled: false,
           customCellWidth: 30,
            views: [
                {viewName: 'Daily Scheduling', viewType: ViewTypes.Custom, showAgenda: false, isEventPerspective: false},
                // {viewName: 'Weekly Scheduling', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false},
          
            ], // minuteStep: 15
        },{
            getCustomDateFunc: this.getCustomDate,
            //getDateLabelFunc: this.getDateLabel,
        });
        // schedulerData.localeMoment.locale('en');
       
        schedulerData.setResources(resources);
        // schedulerData.setEvents(DemoData.events);
        schedulerData.setMinuteStep(60);
     
     
        console.log(schedulerData.startDate)
        console.log(schedulerData.endDate)
        this.state = {
            viewModel: schedulerData
        }
        this.schedulerData = schedulerData;
    }

    componentDidMount() {
        let resources = [   {
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
           
         },];

         this.schedulerData.setResources(resources);
         this.state = {
            viewModel: this.schedulerData
        }
        this.schedulerData.refresh();
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

        nonAgendaCellHeaderTemplateResolver = (schedulerData, item, formattedDateItems, style) => {
            if(formattedDateItems[0] == '1pm' || 
            (formattedDateItems[0].includes('am') && (!formattedDateItems[0].includes(9) && !formattedDateItems[0].includes(11) &&!formattedDateItems[0].includes(10))) ||
            (formattedDateItems[0].includes('pm') && (formattedDateItems[0].includes(7) || formattedDateItems[0].includes(8) || formattedDateItems[0].includes(9) || formattedDateItems[0].includes(10)|| formattedDateItems[0].includes(11)))
            )
                return ('');
            // console.log(schedulerData.startDate)
            // console.log(item.time)
            // console.log(moment(moment(item.time).diff(moment(schedulerData.startDate))).hours()-7)
            // formattedDateItems = [(moment(moment(item.time).diff(moment(schedulerData.startDate))).hours()-7).toString()]
      let datetime = schedulerData.localeMoment(item.time);
      let isCurrentDate = false;
      if (schedulerData.viewType === ViewTypes.Day) {
          isCurrentDate = datetime.isSame(new Date(), 'hour');
      }
      else {
          isCurrentDate = datetime.isSame(new Date(), 'day');
      }

      if (isCurrentDate) {
        //   style.backgroundColor = '#118dea';
        //   style.color = 'white';
      }
      return (
          <th key={item.time} className={`header3-text`} >
              {
                  formattedDateItems.map((formattedItem, index) => (
                      <div key={index}
                           dangerouslySetInnerHTML={{__html: formattedItem.replace()}}/>
                  ))
              }
          </th>
      );
  }
    getCustomDate = (schedulerData, num, date = undefined) => {

        
        return {

            startDate:  moment(schedulerData.startDate).add(num, 'days').format(DATETIME_FORMAT),
            endDate : moment(schedulerData.endDate).add(num, 'days').format(DATETIME_FORMAT),
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

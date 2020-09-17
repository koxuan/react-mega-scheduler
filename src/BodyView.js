import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import moment from 'moment'
class BodyView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
    }

    render() {

        const {schedulerData} = this.props;
        const {renderData, headers, config, behaviors} = schedulerData;
        let cellWidth = schedulerData.getContentCellWidth();

        let displayRenderData = renderData.filter(o => o.render);
        let tableRows = displayRenderData.map((item) => {
            item.headerItems = (item.headerItems.filter(row => 
                moment(row.time).hours() !== 13
            ));
          
            let rowCells = headers.filter(row => moment(row.time).hours() !== 13 && moment(row.time).hours() > 9 && moment(row.time).hours() < 19).map((header, index) => {
                let key = item.slotId + '_' + header.time;
                let style = index === headers.length - 1 ? {} : {width: cellWidth};
                if(!!header.nonWorkingTime)
                    style = {...style, backgroundColor: config.nonWorkingTimeBodyBgColor};
                if(item.groupOnly)
                    style = {...style, backgroundColor: config.groupOnlySlotColor};
                if(!!behaviors.getNonAgendaViewBodyCellBgColorFunc){
                    let cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(schedulerData, item.slotId, header);
                    if(!!cellBgColor)
                        style = {...style, backgroundColor: cellBgColor};
                }
            
                return  <td key={key} ><div></div></td>
                
            });
         
            return (
                <tr key={item.slotId} style={{height: item.rowHeight}}>
                    {rowCells}
                </tr>
            );
        });

        return (
            <tbody>
                {tableRows}
            </tbody>
        );
    }
}

export default BodyView
/* eslint-disable react/prop-types */
import "./BubbleSelect.css"

const BubbleSelect = (props) => {
    return (
        <div className={`bselect-container ${props.classes}`}>
            <label htmlFor="bubbles" className="filter-label">{props.label} </label>
            <br />
            <div className="bubble-container">
                {props.options ? props.options.map((bOption, index) => {
                    return <button 
                        key={`bOption-${props.type}-${index}`} 
                        className={`bOption ${index == props.active ? 'active' : ''}`}
                        onClick={(e) => {props.handleClick(e)}}
                        value={bOption}
                        name={`bOption-${props.type}-${index}`}>
                            {bOption}
                        </button>
                }) : null}
            </div>
            
        </div> 
   
    );
}

export default BubbleSelect;
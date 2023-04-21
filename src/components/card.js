
import styles from "../styles/card.module.css"

function Card(props) {
    const { imageSrc, children, completed, temporarilyVisible } = props

    return (
      
            <div 
            onClick={temporarilyVisible || completed ? null : props.onClick} 
            className={
                completed ? 
                (`${styles["card"]} ${styles["card-completed"]}`)
                :   ( temporarilyVisible || completed 
                    ?  styles["card"] 
                    : `${styles["card"]} ${styles["card-disable"]}`)
                }>
                <img className={styles["card-image"]} src={imageSrc} />
                <div className={styles["card-info"]}>
                    <h2>{children.name}<span>{children.year}</span></h2>
                </div>

            </div>
     


    )
}
export default Card
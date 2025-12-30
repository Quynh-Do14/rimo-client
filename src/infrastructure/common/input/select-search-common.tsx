import React from 'react';
import styles from "@/assets/styles/components/input.module.css"

type Props = {
    listDataOfItem: Array<any>,
    onChange: any
}

const SelectSearchCommon = (props: Props) => {
    const {
        listDataOfItem,
        onChange
    } = props;

    return (
        <div className={styles.inputCommon}>
            <div className={styles.inputWrapper}>
                <select
                    onChange={onChange}
                    className={styles.textInput}
                >
                    {
                        listDataOfItem && listDataOfItem.length && listDataOfItem.map((item, index) => {
                            return (
                                <option key={index} value={item.id}>{item.name}</option>
                            )
                        })
                    }
                </select>
                <div className={styles.inputBorder}></div>
            </div>
        </div>
    );
};

export default SelectSearchCommon;

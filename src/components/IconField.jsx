import React from 'react';
import { FaClipboardList, FaTachometerAlt, FaDollarSign, FaMoneyBillAlt, FaCar, FaIndustry, FaCarSide, FaCalendarAlt, FaRoad, FaCogs, FaGasPump, FaWrench, FaCircle, FaPalette, FaIdCard, FaFileAlt } from 'react-icons/fa';

const iconMap = {
  FaClipboardList: <FaClipboardList />,
  FaDollarSign: <FaDollarSign />,
  FaMoneyBillAlt: <FaMoneyBillAlt />,
  FaCar: <FaCar />,
  FaIndustry: <FaIndustry />,
  FaCarSide: <FaCarSide />,
  FaCalendarAlt: <FaCalendarAlt />,
  FaRoad: <FaRoad />,
  FaCogs: <FaCogs />,
  FaGasPump: <FaGasPump />,
  FaTachometerAlt: <FaTachometerAlt />,
  FaWrench: <FaWrench />,
  FaCircle: <FaCircle />,
  FaPalette: <FaPalette />,
  FaIdCard: <FaIdCard />,
  FaFileAlt: <FaFileAlt />
};

function IconField({icon}){
  return(
    <div>
      {iconMap[icon]}
    </div>
  )
}

export default IconField
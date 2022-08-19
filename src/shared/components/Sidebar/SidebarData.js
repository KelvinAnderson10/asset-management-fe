import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as GoIcons from 'react-icons/go';

export const SidebarData = [
  {
    title: 'Overview',
    path: '/main',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Data Management',
    path: '/data-management',
    icon: <GoIcons.GoDatabase/>,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Asset Item',
        path: '/data-management/asset-item',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Product',
        path: '/data-management/product',
        icon: <FaIcons.FaProductHunt/>,
        cName: 'sub-nav'
      },
      {
        title: 'Vendor',
        path: '/data-management/vendor',
        icon: <FaIcons.FaStore/>
      },
      {
        title: 'Location',
        path: '/data-management/location',
        icon: <GoIcons.GoLocation
        />
      }
    ]
  },
  {
    title: 'Import Data',
    path: '/upload-data',
    icon: <FaIcons.FaFileUpload/>
  }
];
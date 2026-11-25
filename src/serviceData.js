export const serviceMenu = [
  {
    id: 'massage',
    title: 'Massage Therapy',
    description: 'Massage treatments',
    groups: [{
      title: 'Massage treatments',
      items: [
        ['Swedish Massage', 60000],
        ['Deep Tissue Massage', 70000],
        ['Sport Massage', 70000],
        ['Hot Stone Massage', 75000],
        ['Prenatal Massage', 65000],
        ['Ashiatsu Massage', 75000],
        ['Aromatherapy Massage', 80000]
      ]
    }]
  },
  {
    id: 'facials',
    title: 'Facial Treatments',
    description: 'Facial treatments',
    groups: [{
      title: 'Facial treatments',
      items: [
        ['Classic Facials', 35000],
        ['Anti Aging Facials', 45500],
        ['Deep Cleansing Facials', 55000],
        ['Skin Brightening Facials', 60000],
        ['Medical Acne Facials', 65000]
      ]
    }]
  },
  {
    id: 'body',
    title: 'Body Treatments',
    description: '30 minutes each',
    groups: [{
      title: 'Body scrubs',
      note: 'Each treatment is 30 minutes.',
      items: [
        ['Coffee Body Scrub', 50000],
        ['Detoxifying Body Scrub', 55000],
        ['Orange Body Scrub', 45000],
        ['Chocolate Body Scrub', 50000],
        ['Milky Body Scrub', 45000],
        ['Boreh Bali Body Scrub', 55000]
      ]
    }]
  },
  {
    id: 'beauty',
    title: 'Beauty & Personal Care',
    description: 'Manicure, pedicure & waxing',
    groups: [
      {
        title: 'Manicure & pedicure',
        items: [
          ['Manicure', 15000],
          ['Standard Pedicure', 25000],
          ['Jelly Pedicure', 35000]
        ]
      },
      {
        title: 'Waxing — Women',
        items: [
          ['Under Arm', 10000],
          ['Full Arm', 15000],
          ['Half Arm', 10000],
          ['Half Leg', 17000],
          ['Full Leg', 25000],
          ['Brazilian', 25000],
          ['Full Tummy', 10000],
          ['Chest', 15500],
          ['Back', 13500],
          ['Chin', 8000],
          ['Upper Lip', 6000],
          ['Belly Button', 5000],
          ['Bum Wax', 10000],
          ['Bikini', 15000]
        ]
      },
      {
        title: 'Waxing — Men',
        items: [
          ['Under Arm', 15000],
          ['Full Arm', 25000],
          ['Half Arm', 16500],
          ['Half Leg', 25000],
          ['Full Leg', 32000],
          ['Brazilian', 32500],
          ['Full Tummy', 18000],
          ['Chest', 21500],
          ['Back', 22000],
          ['Chin', 8000],
          ['Upper Lip', 6000],
          ['Belly Button', 5000],
          ['Bum Wax', 16000]
        ]
      },
      {
        title: 'Full body wax packages',
        items: [
          ['Women — With Brazilian', 158000],
          ['Women — Without Brazilian', 108000],
          ['Men — With Brazilian', 187000],
          ['Men — Without Brazilian', 135500]
        ]
      }
    ]
  },
  {
    id: 'wellness',
    title: 'Wellness Treatments',
    description: 'Wellness treatments',
    groups: [{
      title: 'Wellness treatments',
      items: [
        ['Glutha Brightening Drip', 65000],
        ['Glutha Glow Drip', 55000],
        ['Anti Aging Drip', 45500],
        ['Detox Drip', 70000],
        ['Myers’ Cocktail', 50000],
        ['Energy Booster Shot', 15000]
      ]
    }]
  },
  {
    id: 'relaxation',
    title: 'Relaxation Experiences',
    description: 'Káráyá experiences',
    groups: [{
      title: 'Káráyá experiences',
      items: [
        ['Káráyá Relaxation Combo', 145500],
        ['Káráyá Destress Booster', 115500],
        ['Káráyá Cleansing Ritual', 175500],
        ['Káráyá Boost', 70500]
      ]
    }]
  },
  {
    id: 'packages',
    title: 'Special Spa Packages',
    description: 'Káráyá spa packages',
    groups: [{
      title: 'Káráyá spa packages',
      items: [
        ['Káráyá Couples Romantic Eclipse', 235000],
        ['Káráyá Glow Package', 155500],
        ['Káráyá Couple’s Glow Therapy', 225500],
        ['Káráyá Female Reset', 130500],
        ['Káráyá Male Reset', 185500],
        ['Káráyá Anti-aging Eclipse', 151000]
      ]
    }]
  }
];

export const formatNaira = amount => `₦${amount.toLocaleString('en-NG')}`;

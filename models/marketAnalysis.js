const marketAnalysis = {
  type: 'P30',
  TTM: new Date(),
  productRelationship: [
    {
      type: '前置',
      apply: '主摄',
      specification: '32M',
      outPartNo: 'L50266A', // 外部料号
      analyze: 'L50266A',
      noAnalyze: '',
      remark: '上海华为',
      product: {
        type: 'FHD',
        partNO: '39143A', // 该表料号与舜宇的关系
        background: '',
        opticalSystem: '39143',
        competitor: '',
        chip: {
          sensor: 'IMX616',
          size: '1/2.8\'\'',
          pixel: '0.8'
        },
        lens: {},
        FNO: 2.0,
        FOV: 79.0,
        TTL: 4.345,
        FFL: 0.845,
        maxCRA: 34.6,
        structure: '5P',
        MIC: 6.8,
        EFL: 3.82,
        IR: 0.21,
        barrel: '一体式',
        packing: 'COB',
        IH: '3.264',
        VCM: 'FF'
      }
    },
    {
      type: '后置',
      apply: '广角',
      specification: '40M',
      outPartNo: '60079A1', // 外部料号
      analyze: 'L60079',
      noAnalyze: '',
      remark: '上海华为',
      product: {
        type: 'FHD',
        partNO: '39259A', // 该表料号与舜宇的关系
        background: '',
        opticalSystem: '39259',
        competitor: '',
        chip: {
          sensor: 'IMX650',
          size: '1/1.7\'\'',
          pixel: '0.8'
        },
        lens: {},
        FNO: 1.8,
        FOV: 78.0,
        TTL: 6.200,
        FFL: 1.100,
        maxCRA: 34.3,
        structure: '6P',
        MIC: '9.49',
        EFL: 5.55,
        IR: 0.21,
        barrel: '9.15',
        packing: 'COB',
        IH: '4.595',
        VCM: 'FF'
      }
    },
    {
      type: '后置',
      apply: '超广角',
      specification: '16M',
      outPartNo: '39128A', // 外部料号
      analyze: 'L60116',
      noAnalyze: 'KT8607',
      remark: '上海华为',
      product: {
        type: 'FHD',
        partNO: '39128A', // 该表料号与舜宇的关系
        background: '',
        opticalSystem: '39128',
        competitor: '',
        chip: {
          sensor: 'IMX481',
          size: '1/3.1\'\'',
          pixel: '1.0'
        },
        lens: {},
        FNO: 2.2,
        FOV: 117.0,
        TTL: 5.120,
        FFL: 0.900,
        maxCRA: 35.7,
        structure: '6P',
        MIC: '6.06',
        EFL: 2.24,
        IR: 0.21,
        barrel: 'M6.8*0.25',
        packing: 'COB',
        IH: '2.880',
        VCM: 'FF'
      }
    },
    {
      type: '后置',
      apply: '长焦',
      specification: '8M',
      outPartNo: '50204A1', // 外部料号
      analyze: 'L50204A1',
      noAnalyze: '',
      remark: '上海华为',
      product: {
        type: 'FHD',
        partNO: '38102B',
        background: '',
        opticalSystem: '38102',
        competitor: '',
        chip: {
          sensor: 'OV08A',
          size: '1/4.4\'\'',
          pixel: '1.0'
        },
        lens: {},
        FNO: 2.4,
        FOV: 30.0,
        TTL: 6.400,
        FFL: 0.800,
        maxCRA: 16.8,
        structure: '5P',
        MIC: '4.58',
        EFL: 7.48,
        IR: 0.21,
        barrel: '5.6',
        packing: 'COB',
        IH: '2.040',
        VCM: 'FF'
      }
    }
  ]
}
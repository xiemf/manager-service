// 10       2020 00 01
// account  校验  user
// 11       2020 00 01
const Privilege = require('../models/account/privilege')

const accountManager = [{ code: '1020200000', name: '账号管理', parent: '0' }]
const userPrivilege = [
  { code: '1020200100', name: '用户管理', parent: '1020200000' },
  { code: '1020200101', name: '用户管理-查询', parent: '1020200100' },
  { code: '1020200102', name: '用户管理-新增', parent: '1020200100' },
  { code: '1020200103', name: '用户管理-更新', parent: '1020200100' },
  { code: '1020200105', name: '用户管理-冻结', parent: '1020200100' },
  { code: '1020200106', name: '用户管理-启用', parent: '1020200100' },
  { code: '1020200107', name: '用户管理-角色配置', parent: '1020200100' }
]
const rolePrivilege = [
  { code: '1020200200', name: '角色管理', parent: '1020200000' },
  { code: '1020200201', name: '角色管理-查询', parent: '1020200200' },
  { code: '1020200202', name: '角色管理-新增', parent: '1020200200' },
  { code: '1020200203', name: '角色管理-更新', parent: '1020200200' },
  { code: '1020200204', name: '角色管理-删除', parent: '1020200200' },
  { code: '1020200205', name: '角色管理-权限配置', parent: '1020200200' }
]
const dataManager = [{ code: '1120200000', name: '资料库管理', parent: '0' }]
const chipPrivilege = [
  {code:'1120200100',name:'芯片',parent:'1120200000'},
  {code:'1120200101',name:'芯片-查询',parent:'1120200100'},
  {code:'1120200102',name:'芯片-新增',parent:'1120200100'},
  {code:'1120200103',name:'芯片-更新',parent:'1120200100'},
  {code:'1120200104',name:'芯片-删除',parent:'1120200100'},
]
const productPrivilege = [
  {code:'1120200200',name:'产品',parent:'1120200000'},
  {code:'1120200201',name:'产品-查询',parent:'1120200200'},
  {code:'1120200202',name:'产品-新增',parent:'1120200200'},
  {code:'1120200203',name:'产品-更新',parent:'1120200200'},
  {code:'1120200204',name:'产品-删除',parent:'1120200200'},
]
const developmentPrivilege = [
  {code:'1120200300',name:'研发',parent:'1120200000'},
  {code:'1120200301',name:'研发-查询',parent:'1120200300'},
  {code:'1120200302',name:'研发-新增',parent:'1120200300'},
  {code:'1120200303',name:'研发-更新',parent:'1120200300'},
  {code:'1120200304',name:'研发-删除',parent:'1120200300'},
]
const testPrivilege = [
  {code:'1120200400',name:'测试',parent:'1120200000'},
  {code:'1120200401',name:'测试-查询',parent:'1120200400'},
  {code:'1120200402',name:'测试-新增',parent:'1120200400'},
  {code:'1120200403',name:'测试-更新',parent:'1120200400'},
  {code:'1120200404',name:'测试-删除',parent:'1120200400'},
]
const projectPrivilege = [
  {code:'1120200500',name:'项目',parent:'1120200000'},
  {code:'1120200501',name:'项目-查询',parent:'1120200500'},
  {code:'1120200502',name:'项目-新增',parent:'1120200500'},
  {code:'1120200503',name:'项目-更新',parent:'1120200500'},
  {code:'1120200504',name:'项目-删除',parent:'1120200500'},
]
const privilege = [
  // 账号管理
  ...accountManager, // 账号
  ...userPrivilege, // 用户
  ...rolePrivilege, // 角色
  // 资料库管理
  ...dataManager, // 资料库
  ...chipPrivilege, // 芯片
  ...productPrivilege, // 产品
  ...developmentPrivilege, // 研发
  ...testPrivilege, // 测试
  ...projectPrivilege // 项目
]
Privilege.bulkCreate(privilege, { updateOnDuplicate: ['id'] }).then(res => {
  res.forEach(item => {
    console.log('item:', item.dataValues)
  })
  console.log('priviege 初始化完成')
})

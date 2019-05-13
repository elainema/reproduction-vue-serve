/**
 * roles[0]  item_role_id
 * roles[1]  team_type
 * roles[2]  role_id
 */
const ROLES_DIC = [
  {
    roles: [3, 2, 3],
    roleName: 'am'  
  },
  {
    roles: [4, 2, 3],
    roleName: 'amLeader'
  },
  {
    roles: [3, 1, 5],
    roleName: 'pm'
  },
  {
    roles: [4, 1, 5],
    roleName: 'pmLeader'
  },
  {
    roles: [5, '*', '*'],
    roleName: 'manager'
  },
  {
    roles: [6, '*', '*'],
    roleName: 'manager'
  },
  {
    roles: [4, 1, '*'],
    roleName: 'pmLeader'
  },
  {
    roles: [4, 2, '*'],
    roleName: 'amLeader'
  },
]

const OTHERS = 'others'
/**
 * 
 * 根据userInfo相关id鉴别dashboard中用户身份
 * @param {Number} item item_role_id
 * @param {NUmber} team team_type
 * @param {Number} role role_id
 */
export const getRoleName = (item, team, role) => {
  let result = ROLES_DIC.find(data => {
    let { roles } = data
    return ( (item == roles[0] || roles[0] == '*') && (team == roles[1] || roles[1] == '*') && (role == roles[2] || roles[2] == '*'))
  })

  if(result) {
    return result.roleName
  }
  return OTHERS
}

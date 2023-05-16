import {console} from "next/dist/compiled/@edge-runtime/primitives/console";

export async function login(email, password) {
  const url = "http://localhost:8080/api/auth/login"
  const payload = {
    email: email,
    password: password,
  };

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    return await response.json()
  } catch (ignored) {
    return false
  }
}

export async function getUser(key, returnOrganizations) {
  const url = "http://localhost:8080/api/user/get?key=" + key
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const user = await response.json()

    if (returnOrganizations) {
      return user
    } else {
      return {
        id: user.id,
        key: key,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
      }
    }
  } catch (ignored) {
    return null
  }
}

export async function register(email, password, name, lastname){
  const url = "http://localhost:8080/api/auth/register"
  const payload = {
    email: email,
    password: password,
    name: name,
    lastName: lastname
  };

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    return await response.json()
  } catch (ignored) {
    return null
  }
}

export async function createOrganization(userKey, organizationName) {
  const url = "http://localhost:8080/api/organization/create"
  const payload = {
    key: userKey,
    name: organizationName
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    return await response.json()
  } catch (e) {
    return null
  }
}

export async function getOrganizations(key) {
  if (key === null) return

  const user = await getUser(key, true)
  var organizationObjects = []

  for (const orgId of user.organizations) {
    try {
      organizationObjects.push(await getOrganization(key, orgId))
    } catch (e) {
      console.error(e)
    }
  }

  return organizationObjects;
}

export async function getOrganization(key, organizationId) {
  if (key === null || organizationId === null) return

  const url = "http://localhost:8080/api/organization/get?userKey=" + key + "&organizationId=" + organizationId
  const response = await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  })

  try {
    return await response.json()
  } catch (e) {
    console.error(e)
  }
}

export async function updateUser(key, user) {
  const url = "http://localhost:8080/api/user/update"
  const payload = {
    key: key,
    userDTO: user
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    return await response.json()
  } catch (e) {
    return null
  }
}

export async function createInvite(key, organizationId, email) {
  const url = "http://localhost:8080/api/organization/invite-member"
  const payload = {
    key: key,
    organizationId: organizationId,
    invitedEmail: email
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    if (response.status !== 200) {
      return null;
    } else {
      return response.json()
    }
  } catch (e) {
    console.error(e)
  }
}

export async function deleteInvite(key, organizationId, invitedEmail) {
  const url = "http://localhost:8080/api/organization/update/delete-invite"
  const payload = {
    key: key,
    organizationId: organizationId,
    invitedEmail: invitedEmail
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    if (response.status !== 200) {
      return null;
    } else {
      return response.json()
    }
  } catch (e) {
    console.error(e)
  }
}

export async function joinOrganization(key, organizationId) {
  const url = "http://localhost:8080/api/organization/join"
  const payload = {
    key: key,
    organizationId: organizationId,
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    if (response.status !== 200) {
      return null;
    } else {
      return response.json()
    }
  } catch (e) {
    console.error(e)
  }
}

export async function leaveOrganization(key, organizationId) {
  const url = "http://localhost:8080/api/organization/leave"
  const payload = {
    key: key,
    organizationId: organizationId,
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    if (response.status !== 200) {
      return null;
    } else {
      return response.json()
    }
  } catch (e) {
    console.error(e)
  }
}

export async function getMemberData(key, organizationId, memberId) {
  const url = "http://localhost:8080/api/organization/member-data?userKey=" + key + "&organizationId=" + organizationId + "&memberId=" + memberId
  const response = await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  })

  try {
    return response.json()
  } catch (e) {
    console.error(e)
  }
}

export async function getMembersData(key, organizationId, memberIds){
  const data = []
  for (const memberId of memberIds) {
    const memberData = await getMemberData(key, organizationId, memberId)
    data.push(memberData)
  }

  return data
}

export async function kickMember(key, organizationId, userIdToKick) {
  const url = "http://localhost:8080/api/organization/kick"
  const payload = {
    key: key,
    organizationId: organizationId,
    userIdToKick: userIdToKick
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    if (response.status !== 200) {
      return null;
    } else {
      return response.json()
    }
  } catch (e) {
    console.error(e)
  }
}

export async function updateName(key, organizationId, name) {
  const url = "http://localhost:8080/api/organization/update/name"
  const payload = {
    key: key,
    organizationId: organizationId,
    name: name
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    if (response.status !== 200) {
      return null;
    } else {
      return response.json()
    }
  } catch (e) {
    console.error(e)
  }
}

export async function deleteOrganization(key, organizationId) {
  const url = "http://localhost:8080/api/organization/delete"
  const payload = {
    key: key,
    organizationId: organizationId,
  }

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    if (response.status !== 200) {
      return null;
    } else {
      return response.json()
    }
  } catch (e) {
    console.error(e)
  }
}

export async function getStatisticsData(key, organizationId) {
  const url = "http://localhost:8080/api/organization/statistics-data?userKey=" + key + "&organizationId=" + organizationId
  const response = await fetch(url, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    },
  })

  try {
    return response.json()
  } catch (e) {
    console.error(e)
  }
}
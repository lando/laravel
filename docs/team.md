---
description: Learn about the team that made the Laravel plugin.
layout: page
title: Team
---

<VPLTeamPage>
  <VPLTeamPageTitle>
    <template #title>
      Team
    </template>
    <template #lead>
      We are the people who brought Laravel to Lando.
    </template>
  </VPLTeamPageTitle>
  <VPLTeamMembers :members="members" size="small"/>
</VPLTeamPage>

<script setup>
import {VPLTeamPage, VPLTeamPageTitle, VPLTeamMembers} from '@lando/vitepress-theme-default-plus'
import {useTeam} from '@lando/vitepress-theme-default-plus';

const members = useTeam();

</script>
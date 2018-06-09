package com.yiche.Mapper;

import com.yiche.Entity.AuthorityEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;

public interface AuthorityMapper {
    @Insert("INSERT  INTO [dbo].[Authority] ( [Name], [IsEnabled], [IsRemoved],\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t [CreateTime], [UpdateTime], [Controller],\n" +
            "\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t [Action], [Priority] ) values ( #{Name}, #{IsEnabled}, #{IsRemoved}, #GETDATE(), #GETDATE(), #{Controller},\n" +
            "\t\t\t\t\t\t\t\t\t  #{Action}, #{Priority} )")
    Boolean Add(AuthorityEntity stylePropertyEntity);

    @Insert("INSERT  INTO [dbo].[RoleJoinAuthority] ( [RoleId], [AuthorityId], [CreateTime] )\n" +
            "\t\t\t\t\t\t\tVALUES  ( #{RoleId}, #{AuthorityId}, #GETDATE() )")
    Boolean AddRoleJoinAuthority(@Param("roleId") Integer roleId,@Param("authorityId") Integer authorityId);
}

import { ContentContainer, RootContainer } from "Components/Containers"
import CssBaseline from "@material-ui/core/CssBaseline"
import { Drawer } from "Components/Drawer"
import React from "react"
import { helper, primary } from "../../menu"

export default ({ isMenuOpen, children }) => {
  return (
    <RootContainer>
      <CssBaseline />
      {/* <AppHeader */}
      {/*  isOpen={openSidebar} */}
      {/*  handleClick={handleSidebar} */}
      {/*  title={headerTitle} */}
      {/* /> */}
      <Drawer
        isOpen={isMenuOpen}
        secondaryItems={helper}
        primaryItems={primary}
      />
      <ContentContainer>{children}</ContentContainer>
    </RootContainer>
  )
}

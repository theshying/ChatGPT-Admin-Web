"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

import { DALType } from "@caw/types";
import styles from "./profile.module.scss";
import { Modal } from "antd";
import useUiStore from "@/app/store/ui";
import { IconButton } from "../button/button";
import { useUserStore } from "@/app/store";

export default function ProfileModal() {
  const { show, setShow } = useUiStore((state) => state.profileModal);
  const clearData = useUserStore((state) => state.clearData);
  const logoutHandler = () => {
    clearData();
    setShow(false);
  };
  return (
    <Modal
      open={show}
      footer={null}
      closable={true}
      mask={true}
      onCancel={() => setShow(false)}
    >
      <div className={styles["body"]}></div>

      <div className={styles["footer"]}>
        <IconButton
          onClick={logoutHandler}
          text="退出登录"
          type="primary"
          shadow
          className={styles["logout-btn"]}
        />
      </div>
    </Modal>
  );
  // return (
  //   <>
  //     <div className={styles["window-header"]}>
  //       <div className={styles["window-header-title"]}>
  //         <div className={styles["window-header-main-title"]}>
  //           {Locale.Profile.Title}
  //         </div>
  //         <div className={styles["window-header-sub-title"]}>
  //           {!Locale.Profile.SubTitle}
  //         </div>
  //       </div>
  //       <div className={styles["window-actions"]}>
  //         <div className={styles["window-action-button"]}>
  //           <IconButton
  //             icon={<CloseIcon />}
  //             onClick={() => navigate(Path.Home)}
  //             bordered
  //             title={Locale.Settings.Actions.Close}
  //           />
  //         </div>
  //       </div>
  //     </div>
  //     {/*
  //     <div className={styles["container"]}>
  //       {planData &&
  //         planData.plans.map((plan, index1) =>
  //           plan.prices.map((price, index2) => (
  //             <PricingItem
  //               key={`${index1}-${index2}`}
  //               router={router}
  //               plan={plan}
  //               price={price}
  //             />
  //           )),
  //         )}
  //     </div> */}
  //     <div className={styles["container"]}>
  //       <Avatar />
  //     </div>

  //     <div className={styles["footer"]}>
  //       <IconButton
  //         text="退出登录"
  //         type="primary"
  //         shadow
  //         className={styles["logout-btn"]}
  //       />
  //     </div>
  //   </>
  // );
}

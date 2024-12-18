import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const candidates = ["Vladimir", "Sergey", "Pervukhin"];

  await deploy("ContractVoting", {
    from: deployer,
    args: [candidates],
    log: true,
    autoMine: true,
  });

  console.log("👋 Сontract was successfully deployed");
};

export default deployYourContract;

deployYourContract.tags = ["ContractVoting"];

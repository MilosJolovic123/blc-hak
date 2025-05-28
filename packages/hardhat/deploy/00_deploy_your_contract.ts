import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // Koristi deployer kao issuer ili postavi fiksnu adresu
  await deploy("DigitalIdentity", {
    from: deployer,
   // args: [deployer], // ✅ prosleđuješ issuer adresu
    log: true,
  });
};

export default func;
func.tags = ["DigitalIdentity"];

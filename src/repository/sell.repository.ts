import { EntityRepository, Repository } from "typeorm";
import Sell from "../entities/Sell";

@EntityRepository(Sell)
class SellRepository extends Repository<Sell> {}

export default SellRepository;

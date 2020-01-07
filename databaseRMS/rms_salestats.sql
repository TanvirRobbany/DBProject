-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: rms
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `salestats`
--

DROP TABLE IF EXISTS `salestats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salestats` (
  `idBalance` int(10) NOT NULL AUTO_INCREMENT,
  `receivedBy` varchar(50) NOT NULL,
  `idMenu` int(10) NOT NULL,
  PRIMARY KEY (`idBalance`),
  UNIQUE KEY `idbalance_UNIQUE` (`idBalance`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salestats`
--

LOCK TABLES `salestats` WRITE;
/*!40000 ALTER TABLE `salestats` DISABLE KEYS */;
INSERT INTO `salestats` VALUES (1,'undefined',8),(2,'s@gmail.com',6),(5,'undefined',7),(6,'undefined',7),(7,'undefined',6),(8,'undefined',8),(9,'cashier@gmail.com',8),(10,'cashier@gmail.com',7),(11,'cashier@gmail.com',6),(12,'s@gmail.com',6),(13,'s@gmail.com',6),(14,'s@gmail.com',6),(15,'s@gmail.com',7),(16,'s@gmail.com',8),(17,'s@gmail.com',8),(18,'s@gmail.com',7),(19,'s@gmail.com',7),(20,'s@gmail.com',6),(21,'s@gmail.com',6),(22,'s@gmail.com',7),(23,'s@gmail.com',8),(24,'s@gmail.com',7),(25,'s@gmail.com',6),(26,'s@gmail.com',6),(27,'s@gmail.com',7),(28,'s@gmail.com',7),(29,'s@gmail.com',6),(30,'s@gmail.com',6),(31,'s@gmail.com',8),(32,'s@gmail.com',8),(33,'s@gmail.com',7),(34,'s@gmail.com',6),(35,'cashier@gmail.com',6),(36,'cashier@gmail.com',6),(37,'cashier@gmail.com',7),(38,'cashier@gmail.com',8),(39,'cashier@gmail.com',7),(40,'cashier@gmail.com',6);
/*!40000 ALTER TABLE `salestats` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-07 23:11:33
